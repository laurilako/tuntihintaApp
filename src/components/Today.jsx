import React, { useEffect, useState } from "react";
import { calculateAverage, findCurrentPrice } from "../util/helperFunctions";
import './Today.css'

function Today({data}) {

    const [currPriceColor, setCurrPriceColor] = useState(null)
    const [meanPrice, setMeanPrice] = useState(calculateAverage(data))

    useEffect(() => {
        if(currentPriceData < meanPrice) {
            setCurrPriceColor('green')
        }
        if(currentPriceData > meanPrice) {
            setCurrPriceColor('red')
        }
    }, [data, meanPrice])

    const currDate = new Date()
    const currentPriceIndex = findCurrentPrice(data, currDate)
    const currentPriceData = data[currentPriceIndex] ? data[currentPriceIndex].value : null

    return (
    <div className="time">
        <p>
            {currDate.getDate()}.{currDate.getMonth() + 1}.{currDate.getFullYear()} klo {currDate.getHours()}
        </p>
        <h3>Hinta nyt: </h3>
            <div className="currentPrice" style={{color: currPriceColor ? currPriceColor : 'orange'}}>{currentPriceData ? currentPriceData.toFixed(2) + ' c/kWh' : 'Ei saatavilla'}</div>
        <h3>Ajanjakson keskiarvo: </h3>
            <div className="meanPrice">{meanPrice ? meanPrice.toFixed(2) + ' c/kWh' : 'Ei saatavilla'}</div>
    </div>
    );
}

export default Today;