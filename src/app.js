const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Comand to customize the server
//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mauro Navarro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mauro Navarro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get Help!',
        hNumber: 'Please call: +888888888',
        name: 'Mauro Navarro'
    })
})

//Routes of the Server
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide an address"
        })
        return
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error })
            return
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
                return
            }
            console.log('\n-> Weather for: ' + location)
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 NOT FOUND',
        error: 'Help article not found'
    })
})

//The * char is a match for everything else, it has to be the last route in the doc.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 NOT FOUND',
        error: 'Page not found'
    })
})

//Sets server to listen on port 3000
app.listen(3000, () => {
    console.log('Server is up in port 3000')
})