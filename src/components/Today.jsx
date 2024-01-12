import React from "react";
import { findCurrentPrice } from "../util/helperFunctions";
import './Today.css'

function Today({data}) {
    const currDate = new Date()
    const currentPriceData = findCurrentPrice(data, currDate)
    return (
    <div className="time">
        <p>
            {currDate.getDate()}.{currDate.getMonth() + 1}.{currDate.getFullYear()} klo {currDate.getHours()}
        </p>
        <h3>Hinta nyt: </h3> <div className="currentPrice">{currentPriceData ? currentPriceData.toFixed(2) + ' c/kWh' : 'Ei saatavilla'}</div>
    </div>
    );
}

export default Today;