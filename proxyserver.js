import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

import documentParser from "./util/format.js"

dotenv.config();

const app = express();
const API_KEY = process.env.VITE_KEY
const bUrl = "https://web-api.tp.entsoe.eu/api?"

app.use(cors())

const port = 4000

// listening for port 4000
app.listen(4000, ()=> console.log(`Server is running on ${port}` ))

// handle GET request
app.get('/getWeekPrices', (req,res) => {

    const url_to_call = formUrl();
    console.log(url_to_call)

    axios.get(url_to_call)
    .then(response => {
        const data = response.data;
        const jsonData = documentParser(data);
        console.log("JSONDATA", jsonData)
        res.send(jsonData);
    })
    .catch(error => {
        console.log(error);
    })
}
)

// Function to form the url to create API request. Handles the time interval and the API key.
function formUrl() {
    // TODO: Find logic that addresses the time interval and new prices which are published around 14:00 for the next day. Also time zone might be an issue.

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setDate(endDate.getDate());
    endDate.setHours(22, 0, 0, 0);
    
    const timeInterval = `${startDate.toISOString()}/${endDate.toISOString()}`;

    // console.log(timeInterval)
    // console.log(typeof(timeInterval))

    const url_to_call = bUrl + 'securityToken=' + API_KEY + '&documentType=A44' + "&in_Domain=10YFI-1--------U"
    + "&out_Domain=10YFI-1--------U" + "&timeInterval=" + timeInterval;

    return url_to_call
}
