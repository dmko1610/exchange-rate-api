const PORT = process.env.PORT || 8000
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

const rate = {}

app.get("/", (req, res) => {
  res.json("Welcome to exchange rate api!")
})

app.get(`/currencies/:currencyCode`, (req, res) => {
  axios.get(`https://www.investing.com/currencies/${req.params.currencyCode}`)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      $('[data-test="instrument-price-last"]', html)
        .map(function () {
          const rateValue = $(this).text()
          rate.value = rateValue
        })
      res.json(rate)
    }).catch((err) => console.error(err))
})

app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`))
