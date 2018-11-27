const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .option({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
geocode.geocodeAddress(argv.a, (errorMsg, results) => {
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    weather.getWeather(results.latitude, results.langtidue, (errorMsg, weatherResults) => {
      if (errorMsg) {
        console.log(errorMsg);
      } else {
        console.log(results.address)
        console.log(`The temprature is ${weatherResults.temparture} but files like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});