import React from 'react';
import { Chart } from 'react-google-charts';

const options = {
    title: 'Hinta',
    legend: { position: 'bottom' },
    hAxis: {
        title: 'Tunti',
    },
    vAxis: {
        title: 'Hinta: senttiä/kWh',
    },
    animation: {
        startup: true,
        easing: 'linear',
        duration: 1500,
    },
}

const VisualChart = ({data}) => {

    // example data: 
    // {
    //     "prices": [
    //         {
    //             "date": "2023-12-31T22:00:00.000Z",
    //             "value": 49.612399999999994
    //         },
    //         {
    //             "date": "2023-12-31T23:00:00.000Z",
    //             "value": 47.578799999999994
    //         }, ...
    //     ]
    // }

    // Format dates to be more readable and convert prices.
    const formatDates = (data) => {
        const formatted = data.map(price => {
            const date = new Date(price.date)
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const hours = date.getHours()
            return {
                date: `${day}.${month}.${year} ${hours}:00`,
                value: price.value/10
            }
        })
        return formatted
    }

    data = formatDates(data)
    console.log(data)
    
    return (
        <Chart
        width={'100vh'}
        height={'800px'}
        chartType="ColumnChart"
        loader={<div>Ladataan kuvaajaa</div>}
        data={[
            ['Tunti', 'Hinta: senttiä/kWh'],
            ...data.map(price => [price.date, price.value])
        ]}
        options={options}
        rootProps={{ 'data-testid': '1' }}
        />
    );
}

export default VisualChart;