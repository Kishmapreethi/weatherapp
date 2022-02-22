const request = require('request');

const forecast = function (data, cb) {
    request(`http://api.weatherstack.com/current?access_key=8be9270919d59c0246a6cc509b5bec1f&query=${data.lat},${data.long}`, function (error, response, body) {
        if (error) {
            cb(error, undefined)
            return;
        }

        var result = JSON.parse(body);
        cb(undefined, result.current.weather_descriptions[0]);
    });
}

module.exports = forecast;