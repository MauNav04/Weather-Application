const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4b76536e77465809cc2c00c19bdf026a&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        // Catch low level OS errors
        if (error) {
            callback('There is an error with the Weather service', undefined)
        }
        // Catch input or invalid request errors
        else if (body.error) {
            callback('Unable to find location !', undefined)
        }
        else {
            const data = body.current
            callback(undefined,
                data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. It feels like '
                + data.feelslike + ' degrees out.'
            )
        }
    })
}

module.exports = forecast
