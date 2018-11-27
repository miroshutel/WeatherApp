const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/5037c15663c6117bf8aed18073408e95/${lat},${lng}?lang=he&units=si`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to weather api');
    } else if (response.statusCode == 200) {
      callback(undefined, {
        temparture: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('bad request to weather api');
    }
  });
}

module.exports.getWeather = getWeather;