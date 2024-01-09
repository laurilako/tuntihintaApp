import React from 'react';
import { Chart } from 'react-google-charts';

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
        duration: 1500,
    },
}

const VisualChart = ({data}) => {
    console.log(data)

    // format dates to be more readable
    const formatDates = (data) => {
        const formattedData = data.map(price => {
            const date = new Date(price.date)
            const nextDate = new Date(price.date)
            nextDate.setHours(nextDate.getHours() + 1)
            return {
                date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:00-${nextDate.getHours()}:00`,
                value: price.value
            }
        })
        return formattedData
    }

    data = formatDates(data)
    //console.log(data)

    //TODO: Visualize data with Google Charts, add some styling and highlight current hour, max and min values.
    return (
        <Chart
            chartType="ColumnChart"
            width="1200px"
            height="700px"
            data={[
                ['Tunti', 'Hinta'],
                ...data.map(price => [price.date, parseFloat(price.value)]),
            ]}
            options={options}
            rootProps={{ 'data-testid': '1' }}
        />
    );
}

export default VisualChart;