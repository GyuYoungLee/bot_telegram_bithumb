const axios             = require('axios')
const TICKER_API_URL    = 'https://api.bithumb.com/public/ticker'

module.exports = class Bithumb {
    async ticker(coinSymbol = 'ALL') {
        const reqUrl = `${TICKER_API_URL}/${coinSymbol}`
        try {
            const res = await axios.get(reqUrl)
            return res.data.data
          } catch (err) {
            throw new Error(err)
          }
    }
}