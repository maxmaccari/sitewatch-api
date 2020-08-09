const axios = require('axios')

// This perform a "ping" using axios. It's not actually a 'ping', but we can know
// the page loading time.
module.exports = {
  ping(url) {
    return new Promise((resolve, reject) => {
      const calculateTime = ({ status }) => {
        const endTime = new Date().getTime()
        const latency = endTime - startTime
        resolve({latency, status})
      }
      const startTime = new Date().getTime()
      axios
        .get(url)
        .then(calculateTime)
        .catch((error) => {
          if(error.response) {
            calculateTime(error.response)
          } else {
            // If the error does not have a response, this means that the website
            // does not exists or it's not connected to internet.
            reject(error)
          }
        })
    })
  },
}
