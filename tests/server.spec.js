const axios = require('axios')
const assert = require('chai').assert

const app = require('../src/app')
let server;

const agent = axios.create({
    baseURL: 'http://localhost:3000'
})

const seasons = ['winter', 'spring', 'summer', 'autumn']

describe('Service', () => {
    before(() => {
        server = app.listen(3000)
    })

    after(() => {
        server && server.close()
    })

    it('should be up and running', async () => {
        const response = await agent.get('/')

        assert.equal(response.status, 200)
        assert.equal(response.data, "Service up and running!")
    })

    it('should return all seasons', async () => {
        const response = await agent.get('/seasons')

        assert.equal(response.status, 200)
        assert.equal(response.data, "Seasons: winter, spring, summer, autumn")
    })

    seasons.forEach(season => {
        it(`should return ${season} response`, async () => {
            const response = await agent.get(`/seasons/${season}`)

            assert.equal(response.status, 200)
            assert.equal(response.data, `Hello ${season}!`)
        })
    })

    it('should return season not found', async () => {
        try {
            await agent.get(`/seasons/non-existing-season`)
        } catch(e) {
            assert.equal(e.response.status, 404)
            assert.equal(e.response.data, 'Season not found!')
        }
    })

    it('should return unauthorized to create season', async () => {
        try {
            await agent.post('/seasons')
        } catch(e) {
            assert.equal(e.response.status, 401)
            assert.equal(e.response.data, 'You cannot create a new season, doh!')
        }
    })
})
