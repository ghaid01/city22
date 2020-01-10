'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;

const server = express();
server.use( cors() );

server.listen( PORT, () => console.log(`listening on port ${PORT}`));


server.get('/location', locationHandler);
server.get('/weather', weatherHandler);


function locationHandler(req,res){
    let locationInfo = getLocation(req.query.data);
    res.status(200).json(locationInfo);
}

function getLocation(city){
    let data = require('./data/geo.json');
    return new Location(city,data);
}

function Location(city,data){
    this.search_query = city;
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;;
}
// -------------------------
//WEATHER
//--------------------------

function weatherHandler(req,res){
let weatherInfo = getWeather(req.query.data);
res.status(200).json(weatherInfo);
}


function getWeather(city){
let data = require('./data/darksky.json');
return data.daily.data.map( (day) => {
    return new Weather(day);
});
console.log(stuff);
}

function Weather(day){
this.forecast = day.summary;
this.time = new Date(day.time * 1000).toDateString();
}
server.use('*', (req,res) =>{
res.status(404).send("WHAT ARE YOU TALKING ABOUT?")
});