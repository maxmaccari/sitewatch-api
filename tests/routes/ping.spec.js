const request = require('supertest')
const app = require('../../src/app')

jest.mock('../../src/services/PingService')
const PingService = require('../../src/services/PingService')

describe('POST /ping', () => {
  it('should response with the latency and http status if ping is sucessfull', done => {
    PingService.ping.mockResolvedValue({latency: 120, status: 200})
    const url = 'https://www.example.com'

    request(app)
      .post('/ping')
      .send({ url })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.url).toBe('https://www.example.com')
        expect(body.latency).toBe(120)
        expect(body.status).toBe(200)

        done()
      })
  })

  it('should response with the error if ping is not sucessfull', done => {
    PingService.ping.mockRejectedValue({code: 'ERR', message: 'msg'})
    const url = 'https://www.example.com'

    request(app)
      .post('/ping')
      .send({ url })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then(({ body }) => {
        expect(body.code).toBe('ERR')
        expect(body.message).toBe('msg')

        done()
      })
  })

  it('should return 400 if url is missing', done => {
    request(app)
      .post('/ping')
      .send({ })
      .set('Accept', 'application/json')
      .expect(400, done)
  })

  it('should return 400 if url is invalid', done => {
    request(app)
      .post('/ping')
      .send({ url: 'http/1kasfdf' })
      .set('Accept', 'application/json')
      .expect(400, done)
  })
})
