import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { findMax, findMin, formatDates } from '../util/helperFunctions';

const VisualWeekChart = ({data}) => {
    const [maxIndex, setMaxIndex] = useState(null)
    const [maxValue, setMaxValue] = useState()
    const [minValue, setMinValue] = useState()
    const [minIndex, setMinIndex] = useState(null)
    const [dataForChart, setDataForChart] = useState([])

    useEffect(() => {
        var maxIndex = findMax(data)
        var minIndex = findMin(data)
        setMaxIndex(maxIndex)
        setMinIndex(minIndex)
        setMaxValue(data[maxIndex].value)
        setMinValue(data[minIndex].value)
        const formattedData = formatDates(data)
        setDataForChart(formattedData)
        
    }, [])

    const options = {
        title: 'Pörssisähkön hinta kuluneelta 7 päivältä tunneittain senttiä/kWh + 24% alv',
        backgroundColor: '#eee7d7',
        chartArea: { height: "80%", width: "80%" },
        hAxis: {
            title: 'Päivä',
            slantedText: true,
            gridlines: {
                units: {
                  days: {format: ['MMM dd']},
                  hours: {format: ['HH:mm', '']}
                }
            },
            minorGridlines: {
                units: {
                  hours: {format: ['HH:mm', '']}
                }
            }
        },
        vAxis: {
            title: 'Hinta: senttiä/kWh',
            viewWindow: { max: parseFloat(maxValue)}
        },
        explorer: {
            axis: 'horizontal',
            actions: ['dragToZoom', 'rightClickToReset'],
            keepInBounds: true,
            zoomDelta: 1.1,
        },
        pointSize: 3,
        dataOpacity: 0.7,
    }
    
    const dataForWeekChart = [
        ['Päivä', 'Hinta', { role: 'style' }],
        ...dataForChart.map((price, index) => {
            if(index === maxIndex) {
                return [price.date, parseFloat(price.value), 'point { size: 4; shape-type: dot; fill-color: red; visible: true; }']
            }
            if(index === minIndex) {
                return [price.date, parseFloat(price.value), 'point { size: 4; shape-type: dot; fill-color: green; visible: true;}']
            }
            else {
                return [price.date, parseFloat(price.value), '']
            }
        })
    ]
    console.log(dataForChart)
    return (
        <div className='chart'>
            <Chart
                chartType="LineChart"
                width="1200px"
                height="700px"
                data={dataForWeekChart}
                options={options}
            />
        </div>
    );
}

export default VisualWeekChart;