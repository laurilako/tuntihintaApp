import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { findMax, findMin, findCurrentPrice } from '../util/helperFunctions';

const VisualWeekChart = ({data}) => {
    const [maxIndex, setMaxIndex] = useState(null)
    const [maxValue, setMaxValue] = useState()
    const [minIndex, setMinIndex] = useState(null)
    const [dataForChart, setDataForChart] = useState([])
    
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
        tooltip: { isHtml: true, trigger: 'both', textStyle: {fontSize: 14} },
        hAxis: {
            title: 'Päivä',
            slantedText: true,
            gridlines: {
                units: {
                  days: {format: ['dd.MM', '']},
                  hours: {format: ['HH:mm', '']},
                }
            },
            minorGridlines: {
                units: {
                    hours: {format: ['HH:mm', 'HH:mm']}
                }
            },
        },
        vAxis: {
            title: 'Hinta: c/kWh',
            viewWindow: { max: parseFloat(maxValue) + 5},
        },
        explorer: {
            axis: 'horizontal',
            actions: ['dragToZoom', 'rightClickToReset'],
            keepInBounds: true,
            zoomDelta: 1.1,
        },
        pointSize: 4,
        dataOpacity: 0.7,
        colors: ['black'],
    }

    const dataForWeekChart = [
        ['Aika', 'Hinta', 
        {role: 'style' },
        {role: 'annotation', type: 'string'}, 
        {role: 'annotationText', type: 'string'},
        {role: 'style' },
        ],
        ...dataForChart.map((price, index) => {
            // if current price, show star on chart
            if(index === findCurrentPrice(dataForChart, new Date())) {
                if(index === maxIndex) {
                    return [new Date(price.date), parseFloat(price.value),
                        'point { size: 8; shape-type: star; fill-color: red; visible: true; }',
                        'Nyt, kallein tunti', 'Nyt: ' + parseFloat(price.value).toFixed(3) + ' c/kWh',
                        null]
                }
                if(index === minIndex) {
                    return [new Date(price.date), parseFloat(price.value),
                        'point { size: 8; shape-type: star; fill-color: green; visible: true; }',
                        'Nyt, halvin tunti', 'Nyt: ' + parseFloat(price.value).toFixed(3) + ' c/kWh',
                        null]
                }
                else {
                    return [new Date(price.date), parseFloat(price.value),
                        'point { size: 8; shape-type: star; fill-color: orange; visible: true; }',
                        'Nyt', 'Hinta nyt: ' + parseFloat(price.value).toFixed(3) + ' senttiä/kWh',
                        null]
                }
            }
            if(index === maxIndex) {
                return [new Date(price.date), parseFloat(price.value),
                    'point { size: 8; shape-type: dot; fill-color: red; visible: true;}',
                    'Kallein tunti', 'Ajanjakson kalleimman tunnin hinta: ' + parseFloat(price.value).toFixed(3) + ' c/kWh',
                    null]
            }
            if(index === minIndex) {
                return [new Date(price.date), parseFloat(price.value),
                    'point { size: 8; shape-type: dot; fill-color: green; visible: true; }',
                    'Halvin tunti', 'Ajanjakson halvimman tunnin hinta: ' + price.value.toFixed(3) + ' c/kWh',
                    null]
            }
            else {
                return [new Date(price.date), parseFloat(price.value), null, null, null,null]
            }
        }),
    ]
    
    return (
        <>
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
        </>
    );
}

export default VisualWeekChart;