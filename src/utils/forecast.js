const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=55bf30e252a80e57e7ff5eefe7f73150&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("sorry cant connect to the network", undefined);
    } else if (body.error) {
      callback("please enter correct location", undefined);
    } else {
      callback(undefined, body.current);
    }
  });
};
module.exports = forecast;
