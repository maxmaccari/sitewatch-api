const PingService = require('../../src/services/PingService')

jest.mock('axios')
const axios = require('axios')

describe('pingService', () => {
  it('returns the status and milliseconds if the request was sucessfull', async () => {
    axios.get.mockResolvedValue({status: 200})
    const url = 'https://www.example.com'

    const {latency, status} = await PingService.ping(url)

    expect(latency).toBeGreaterThanOrEqual(0)
    expect(status).toBe(200)
  })

  it('returns the status and milliseconds if the request was sucessfull with error', async () => {
    axios.get.mockRejectedValue({response: {status: 500}})
    const url = 'https://www.example.com'

    const {latency, status} = await PingService.ping(url)

    expect(latency).toBeGreaterThanOrEqual(0)
    expect(status).toBe(500)
  })

  it('throws an error if the request has an error', done => {
    const error = {code: 'ENOTFOUND', message: 'getaddrinfo ENOTFOUND', response: null}
    axios.get.mockRejectedValue(error)
    const url = 'https://www.example.com'

    PingService.ping(url).catch(throwedError => {
      expect(throwedError).toBe(error)

      done()
    })
  })
})