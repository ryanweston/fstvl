// const httpProxy = require('http-proxy')
// const proxy = httpProxy.createProxyServer()
// const API_URL = process.env.API_URL || 'https://api.mydomain.com'
// const express = require('express')
// const app = express()
import axios from 'axios';
const bodyParser = require('body-parser')
const app = require('express')()
const config = require('../../nuxt.config')
const API_KEY = process.env.API_SECRET


app.use(bodyParser.json())
app.all('/events', async (req, res) => {
  let { lng, lat, range } = req.body;
  console.log(lat);
  if (lat && lng && range) {
    const postcode = await axios.get('https://www.skiddle.com/api/v1/events/search/?api_key=' + API_KEY + '&latitude=' + lat +'&longitude=' + lng + '&radius=' + range + '&eventcode=FEST&order=distance&description=1');
    res.json({ events: postcode.data})
  }
})

module.exports = app