const request = require('request');

const geocode = function (city, cb) {
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoia2lzaG1hIiwiYSI6ImNrenI1d21mcDN5eXoycW5yMG1seHZiYXYifQ.SK8s-D4L_LRvOtWlIhyXbw`, function (error, response, body) {
        console.error('error:', error);

        var result = JSON.parse(body);

        var data = {
            lat: result.features[0].center[1],
            long: result.features[0].center[0]
        }
        cb(data);

    });
}

module.exports = geocode;