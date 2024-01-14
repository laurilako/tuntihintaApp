import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { findMax, findMin, findCurrentPrice } from '../util/helperFunctions';
import './VisualWeekChart.css'

const VisualWeekChart = ({data}) => {
    const [maxIndex, setMaxIndex] = useState(null)
    const [maxValue, setMaxValue] = useState()
    const [minIndex, setMinIndex] = useState(null)
    const [dataForChart, setDataForChart] = useState([])
    const [chartType, setChartType] = useState('LineChart')
    
    useEffect(() => {
        var maxIndex = findMax(data)
        var minIndex = findMin(data)
        setMaxIndex(maxIndex)
        setMinIndex(minIndex)
        setMaxValue(data[maxIndex].value)
        setDataForChart(data)
    }, [])

    const optionsForChart = {
        //title: 'Pörssisähkön hinta kuluneelta 7 päivältä tunneittain, senttiä/kWh + 24% alv.',
        backgroundColor: '#CFE7FD',
        chartArea: { height: "80%", width: "80%" },
        tooltip: { isHtml: true, trigger: 'both', textStyle: {fontSize: 14} },
        bar: {groupWidth: "100%"},
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

    const dataForWeekChartColumn = [
        ['Aika', 'Hinta', 
        {role: 'style' },
        {role: 'annotation', type: 'string'}, 
        {role: 'annotationText', type: 'string'},
        ],
        ...dataForChart.map((price, index) => {
            if(index === findCurrentPrice(dataForChart, new Date())) {
                if(index === maxIndex) {
                    return [new Date(price.date), parseFloat(price.value),
                        '{fill-color: red; stroke-color: black;}',
                        'Nyt, kallein tunti', 'Nyt: ' + parseFloat(price.value).toFixed(3) + ' c/kWh',
                    ]
                }
                if(index === minIndex) {
                    return [new Date(price.date), parseFloat(price.value),
                        '{fill-color: green; stroke-color: black;}',
                        'Nyt, halvin tunti', 'Nyt: ' + parseFloat(price.value).toFixed(3) + ' c/kWh',
                        ]
                }
                else {
                    return [new Date(price.date), parseFloat(price.value),
                        '{fill-color: orange; stroke-color: black;}',
                        'Nyt', 'Hinta nyt: ' + parseFloat(price.value).toFixed(3) + ' senttiä/kWh',
                        ]
                }
            }
            if(index === maxIndex) {
                return [new Date(price.date), parseFloat(price.value),
                    '{fill-color: red; stroke-color: black;}',
                    'Kallein tunti', 'Ajanjakson kalleimman tunnin hinta: ' + parseFloat(price.value).toFixed(3) + ' c/kWh',
                    ]
            }
            if(index === minIndex) {
                return [new Date(price.date), parseFloat(price.value),
                    '{fill-color: green; stroke-color: black;}',
                    'Halvin tunti', 'Ajanjakson halvimman tunnin hinta: ' + price.value.toFixed(3) + ' c/kWh',
                    ]
            }
            else {
                return [new Date(price.date), parseFloat(price.value), null, null, null,]
            }
        }
        ),
    ]

    
    const dataForWeekChartLine = [
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

    const handleClick = () => {
        if(chartType === 'LineChart') {
            setChartType('ColumnChart')
        } else {
            setChartType('LineChart')
        }
    }

    return (
        <>
            <div>
                <button className='chartButton' onClick={() => handleClick()}><p>Vaihda kaavion tyyppiä</p></button>
           </div>
            <div className='chart'>
                <Chart
                    chartType={chartType}
                    chartLanguage='fi'
                    width="1200px"
                    height="700px"
                    data={chartType === 'LineChart' ? dataForWeekChartLine : dataForWeekChartColumn}
                    options={optionsForChart}
                />
            </div>
        </>
    );
}

export default VisualWeekChart;