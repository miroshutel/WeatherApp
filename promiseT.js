const request = require('request');
var geoCodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAdress = encodeURIComponent(address);
    request({
      url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAdress}&key=70a0f9d52b6a4fd994243dc6278c1612`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('unable to connect to geocode service');
      } else if (body.status.code === 429) {
        reject('over the limit requests');
      } else if (body.status.code === 200) {
        resolve({
          address: body.results[0].formatted,
          latitude: body.results[0].geometry.lat,
          langtidue: body.results[0].geometry.lng
        });
      }
    });
  });

}
geoCodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage);
});