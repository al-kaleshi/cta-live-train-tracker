const functions = require("firebase-functions");
const express = require('express');
const axios = require('axios');
const app = express();


app.get('/api', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const routes = [
        {
            color: 'red',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=red&outputType=JSON`,
        },
        {
            color: 'blue',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=blue&outputType=JSON`,
        },
        {
            color: 'brown',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=brn&outputType=JSON`,
        },
        {
            color: 'green',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=g&outputType=JSON`,
        },
        {
            color: 'orange',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=org&outputType=JSON`,
        },
        {
            color: 'purple',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=p&outputType=JSON`,
        },
        {
            color: 'pink',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=pink&outputType=JSON`,
        },
        {
            color: 'yellow',
            url: `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${apiKey}&rt=y&outputType=JSON`,
        },
    ];

    const trainLocations = (await Promise.all(routes.map(async ({ url, color }) => {
        const { data } = await axios.get(url);
        const [{ train: trains }] = data['ctatt']['route'];
        return trains?.map?.(({ lat, lon }) => ({ lat, lon, color })) ?? [];
    }))).flatMap(item => item);

    
    res.send(trainLocations);
});


exports.main = functions.runWith({secrets: ['API_KEY']}).https.onRequest(app);
