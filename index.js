import express from 'express';
import cors from 'cors';
import axios from 'axios';
import {formUrl, documentParser} from './util/helper.js';

const app = express();

app.use(cors());

// handle GET request from front-end to get 7 day prices from ENTSO-E
app.get('/api/getWeekPrices', (req,res) => {
    const url_to_call = formUrl();
    axios.get(url_to_call)
    .then(response => {
        const data = response.data;
        const jsonData = documentParser(data);
        res.send(jsonData);
    })
    // if api call fails, send error message to front-end
    .catch(error => {
        console.log(error);
        res.status(500).send({error: "Error while fetching prices from ENTSO-E API"})
    })
})
// use express to serve builded front-end
app.use(express.static(process.cwd() + '/dist'));

const port = process.env.PORT || 3000;

// listening for port process.env.PORT
app.listen(port, ()=> console.log(`Server is running on ${port}` ))