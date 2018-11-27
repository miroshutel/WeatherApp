const request = require('request');


var geocodeAddress = (address, callback) => {
  var encodedAdress = encodeURIComponent(address);
  request({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAdress}&key=70a0f9d52b6a4fd994243dc6278c1612`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to geocode service');
    }
    else if (body.status.code === 429) {
      callback('over the limit requests');
    } else if (body.status.code === 200) {
      callback(undefined, {
        address: body.results[0].formatted,
        latitude: body.results[0].geometry.lat,
        langtidue: body.results[0].geometry.lng
      });
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;