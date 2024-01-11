import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { findMax, findMin } from '../util/helperFunctions';

const VisualWeekChart = ({data}) => {
    const [maxIndex, setMaxIndex] = useState(null)
    const [maxValue, setMaxValue] = useState()
    const [minIndex, setMinIndex] = useState(null)
    const [dataForChart, setDataForChart] = useState([])
    const [timeNow, setTimeNow] = useState(new Date())

    useEffect(() => {
        var maxIndex = findMax(data)
        var minIndex = findMin(data)
        setMaxIndex(maxIndex)
        setMinIndex(minIndex)
        setMaxValue(data[maxIndex].value)
        setDataForChart(data)
    }, [])

    const options = {
        //title: 'Pörssisähkön hinta kuluneelta 7 päivältä tunneittain, senttiä/kWh + 24% alv.',
        backgroundColor: '#CFE7FD',
        chartArea: { height: "80%", width: "80%" },
        hAxis: {
            title: 'Päivä',
            slantedText: true,
            gridlines: {
                units: {
                  days: {format: ['dd.MM', '']},
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
        ['Aika', 'Hinta', { role: 'style' }, 
        {role: 'annotation', type: 'string'}, 
        {role: 'annotationText', type: 'string'},
        ],
        ...dataForChart.map((price, index) => {
            if(index === maxIndex) {
                return [new Date(price.date), parseFloat(price.value), 
                    'point { size: 4; shape-type: dot; fill-color: red; visible: true;}',
                    'Kallein tunti', 'Ajanjakson kalleimman tunnin hinta: ' + parseFloat(price.value).toFixed(3) + ' senttiä/kWh']
            }
            if(index === minIndex) {
                return [new Date(price.date), parseFloat(price.value), 
                    'point { size: 4; shape-type: dot; fill-color: green; visible: true; }',
                    'Halvin tunti', 'Ajanjakson halvimman tunnin hinta: ' + price.value.toFixed(3) + ' senttiä/kWh']
            }
            else {
                return [new Date(price.date), parseFloat(price.value), null, null, null]
            }
        })
    ]
    return (
        <div className='chart'>
            <Chart
                chartType="LineChart"
                chartLanguage='fi'
                width="1200px"
                height="700px"
                data={dataForWeekChart}
                options={options}
            />
        </div>
    );
}

export default VisualWeekChart;