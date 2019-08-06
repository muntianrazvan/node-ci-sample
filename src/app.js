const express = require('express')
const app = express()

const SEASONS = ['winter', 'spring', 'summer']

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Service up and running!')
})

app.post('/seasons', (req, res) => {
    res.status(401).send('You cannot create a new season, doh!')
})

app.get('/seasons', (req, res) => {
    res.status(200).send(`Seasons: ${SEASONS.join(', ')}`)
})

app.get('/seasons/:season', (req, res) => {
    const season = req.params.season

    if (SEASONS.indexOf(season) === -1) {
        return res.status(404).send('Season not found!')
    }

    res.status(200).send(`Hello ${season}!`)
})

module.exports = app