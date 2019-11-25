const app = require('./index.js')
const supertest = require('supertest')
const request = supertest(app)

describe('Search products GET endpoint ', function() {
    it('Gets a list of products and prices based on a search query, postcode and category', async done => {
        const response = await request.get('/searchProducts/2000/meat/beef')

        expect(response.status).toBe(200)
        
        done()
    })
})
describe('Param validation should return right status to client', () => {
    it('invalid postcode returns error', async done => {
        const response = await request.get('/searchProducts/3/meat/beef')

        expect(response.status).toBe(400)
        expect(response.body.detail).toBe("Invalid Category or Postcode")
        done()
    })
    it('invalid category returns error', async done => {
        const response = await request.get('/searchProducts/2000/balloons/beef')

        expect(response.status).toBe(400)
        expect(response.body.detail).toBe("Invalid Category or Postcode")
        done()
    })
})
