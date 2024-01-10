import { parseString } from "xml2js";
import dotenv from 'dotenv';
dotenv.config();

const bUrl = "https://web-api.tp.entsoe.eu/api?"
const API_KEY = process.env.VITE_KEY

// Function to parse XML data to JSON format. ENTSO-E API returns XML data which must be parsed to JSON format and cleaned up before it can be used.
// It also adds the VAT 24% to the prices and divides the price by 10 to get the price as c / kWh.
// The function returns an object with a list of prices and their timestamps.
export function documentParser(data) {
    const vat = 1.24;
    let parsed = [];

    parseString(data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        const timeSeriesList = result.Publication_MarketDocument.TimeSeries || [];
        const prices = [];

        timeSeriesList.forEach(timeSeries => {
            const startUtc = timeSeries.Period[0].timeInterval[0].start[0];
            const points = timeSeries.Period[0].Point;

        // Convert XML data to JSON format
        const timeSeriesPrices = points.map(point => {
            const position = parseInt(point.position[0]);
            const priceAmount = parseFloat((point['price.amount'][0] * vat) / 10).toFixed(4);
            const timestamp = new Date(startUtc);
            timestamp.setHours(timestamp.getHours() + (position - 1));

            return { date: timestamp, value: priceAmount };
            })
            prices.push(...timeSeriesPrices);
        });
        parsed = { prices };
    });
    return parsed;
};

// Function to form the url to create API request. Handles the time interval and the API key.
export function formUrl() {
    // TODO: Find logic that addresses the time interval and new prices which are published around 14:00 for the next day. Also time zone might be an issue.

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setDate(endDate.getDate());
    endDate.setHours(22, 0, 0, 0);
    
    const timeInterval = `${startDate.toISOString()}/${endDate.toISOString()}`;

    const url_to_call = bUrl + 'securityToken=' + API_KEY + '&documentType=A44' + "&in_Domain=10YFI-1--------U"
    + "&out_Domain=10YFI-1--------U" + "&timeInterval=" + timeInterval;

    return url_to_call
}
