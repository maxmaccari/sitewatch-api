const axios = require('axios')

// This perform a "ping" using axios. It's not actually a 'ping', but we can know
// the page loading time.
module.exports = {
  async ping(url) {
    const startTime = new Date().getTime()

    try {
      const endTime = new Date().getTime()
      const { status } = await axios.get(url)
      const latency = endTime - startTime
      
      return {latency, status}
    } catch(error) {
      if (error.response) {
        const endTime = new Date().getTime()
        const latency = endTime - startTime

        return {latency, status: error.response.status}
      } else {
        throw error
      }
    }
  },
}
