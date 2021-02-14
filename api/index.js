import axios from 'axios';
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const slowDown = require("express-slow-down");
const API_KEY = process.env.API_SECRET

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
});

app.use(bodyParser.json());
app.use(speedLimiter);

app.all('/events', async (req, res) => {
  
  let { lng, lat, range } = req.body;

  try {
    if (lat && lng && range) {
      const postcode = await axios.get('https://www.skiddle.com/api/v1/events/search/?api_key=' + API_KEY + '&latitude=' + lat +'&longitude=' + lng + '&radius=' + range + '&eventcode=FEST&order=trending&limit=50&description=1');
      res.json({ events: postcode.data})
    } else {
      res.json({ error: 'Incomplete request'})
    }
  } catch(error) {
    res.json({ error: error });
  }
  
})

app.all('/festival', async (req, res) => {
  
  let { id } = req.body;
  console.log(id)
  try {
      const postcode = await axios.get('https://www.skiddle.com/api/v1/events/' + id + '/?api_key=' + API_KEY);
      console.log(postcode)
      res.json({ events: postcode.data})
    } catch(error) {
    res.json({ error: error });
  }
  
})

module.exports = app