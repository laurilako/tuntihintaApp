import { parseString } from "xml2js";

// Function to parse XML data to JSON format. ENTSO-E API returns XML data which must be parsed to JSON format and cleaned up before it can be used.
// It also adds the VAT 24% to the prices and divides the price by 10 to get the price as c / kWh.
// The function returns an object with a list of prices and their timestamps.
function documentParser(data) {
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


export default documentParser;
