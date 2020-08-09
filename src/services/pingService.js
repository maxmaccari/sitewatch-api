const axios = require('axios')

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
            reject(error)
          }
        })
    })
  },
}
