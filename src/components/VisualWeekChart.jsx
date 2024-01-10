import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { findMax, findMin, formatDates } from '../util/helperFunctions';

const options = {
    title: 'Pörssisähkön hinta viikon ajalta (senttiä/kWh). Mukana 24% alv.',
    legend: { position: 'right' },
    hAxis: {
        title: 'Tunti',
    },
    vAxis: {
        title: 'Hinta: senttiä/kWh',
    },
    animation: {
        startup: true,
        easing: 'linear',
        duration: 800,
    },
}

const VisualWeekChart = ({data}) => {
    const [maxIndex, setMaxIndex] = useState(null)
    const [minIndex, setMinIndex] = useState(null)

    useEffect(() => {
        var maxIndex = findMax(data)
        var minIndex = findMin(data)
        setMaxIndex(maxIndex)
        setMinIndex(minIndex)
    }
    , [])

    data = formatDates(data)
    
    const dataForWeekChart = [
        ['Tunti', 'Hinta', { role: 'style' }],
        ...data.map((price, index) => {
            if(index === maxIndex) {
                return [price.date, parseFloat(price.value), 'color: red']
            }
            if(index === minIndex) {
                return [price.date, parseFloat(price.value), 'color: green']
            }
            else {
                return [price.date, parseFloat(price.value), '']
            }
        })
    ]

    return (
        <Chart
            chartType="ColumnChart"
            width="1200px"
            height="700px"
            data={dataForWeekChart}
            options={options}
        />
    );
}

export default VisualWeekChart;