const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWF1bmF2YXJyIiwiYSI6ImNsazUwY3lvaDBmN3kzZHBlMHVjc2YxejMifQ.bsHD_DxvujtJ6vUbj3BRUA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        // Catch low level OS errors
        if (error) {
            callback('There is an error with the Weather Server', undefined)
        }
        // Catch input or invalid request errors
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another location', undefined)
        }
        //The eplace has been found
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

