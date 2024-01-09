import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const API_KEY = process.env.API_KEY
const bUrl = "https://web-api.tp.entsoe.eu/api?"

app.use(cors())

// port
const port = 4000

// listening for port 4000
app.listen(4000, ()=> console.log(`Server is running on ${port}` ))

// handle GET request
app.get('/getPrices', (req,res)=>{

    // TODO: get start and end date from request and format them to values accpeted by the API
    // TODO: Create function that cleans up the data (XML->JSON) and returns it in a format that is easy to use for the front end
    const start = req.query.start
    const end = req.query.end
    const url_to_call = bUrl + 'securityToken=' + API_KEY + '&documentType=A44' + "in_Domain=10YFI-1--------U"
    + "&out_Domain=10YFI-1--------U" + "&periodStart=" + start + "&periodEnd=" + end


    res.json(url_to_call)
    console.log(url_to_call)
//     const options = {
//         method: 'GET',
//         url: url_to_call,
//    };
   
    // axios.request(options).then(function (response) {
    //     res.json(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
})