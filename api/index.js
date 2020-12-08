import axios from 'axios';
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const API_KEY = process.env.API_SECRET


app.use(bodyParser.json());
app.all('/events', async (req, res) => {
  let { lng, lat, range } = req.body;
  try {
    if (lat && lng && range) {
      const postcode = await axios.get('https://www.skiddle.com/api/v1/events/search/?api_key=' + API_KEY + '&latitude=' + lat +'&longitude=' + lng + '&radius=' + range + '&eventcode=FEST&order=distance&description=1');
      res.json({ events: postcode.data})
    }
  } catch(error) {
    res.json({ error: error });
  }
  
})

module.exports = app