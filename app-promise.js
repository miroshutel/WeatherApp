const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
  .option({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    },
    c:{
      demand:false,
      alias:'celsius',
      describe:'get the temparture with celsius',
      boolean:true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAdress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAdress}&key=70a0f9d52b6a4fd994243dc6278c1612`;
axios.get(geoCodeUrl).then((response) => {
  if (response.data.total_results === 0)
    throw new Error('Unable to find address');
  var lat = response.data.results[0].geometry.lat;
  var lng = response.data.results[0].geometry.lng;
  var weatherUrl = `https://api.darksky.net/forecast/5037c15663c6117bf8aed18073408e95/${lat},${lng}?${argv.c?'units=si':''}`;
  console.log(response.data.results[0].formatted);
  return axios.get(weatherUrl).then((response) => {
    var temparture = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temparture}. It feels like ${apparentTemperature}`);
  });
}).catch((e) => {
  if (e.code === 'ENOTFOUND')
    console.log('Unable to connect to api service');
  else
    console.log(e.message);
});