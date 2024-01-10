import express from 'express';
import cors from 'cors';
import axios from 'axios';

import {formUrl, documentParser} from './utilProxyServer/helper.js';


const app = express();

app.use(cors())

const port = 4000

// listening for port 4000
app.listen(4000, ()=> console.log(`Server is running on ${port}` ))

// handle GET request from front-end to get 7 day prices from ENTSO-E
app.get('/getWeekPrices', (req,res) => {
    const url_to_call = formUrl();

    axios.get(url_to_call)
    .then(response => {
        const data = response.data;
        const jsonData = documentParser(data);
        //console.log("JSONDATA", jsonData)
        res.send(jsonData);
    })
    .catch(error => {
        console.log(error);
    })
}
)