const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()
const earliestDate = '1995-06-16';

const setStartDate = (dateString, endDateString) => {
  let endDate
  if (!endDateString) {endDate = new Date();}
  if (!dateString) {
    const nineDaysAgo = new Date();
    nineDaysAgo.setDate(nineDaysAgo.getDate() - 8);
  } else {}
}


app.get('/planetary/apod', async (req, res) => {
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;

  if (!startDate && !endDate) {
    startDate = new Date();
    endDate = new Date();
    startDate.setDate(startDate.getDate() - 8);
  } else if (!startDate){
    startDate = new Date(endDate);
    endDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 8);
  } else if (!endDate){
    const today = new Date();
    endDate = new Date(startDate);
    startDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 8);
    endDate = endDate > today ? today : endDate;
  } else {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  }

  startDate = startDate.toISOString().slice(0, 10);
  endDate = endDate.toISOString().slice(0, 10);

  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    const nasaResponse = await fetch(url);
    console.log(nasaResponse);
    res.statusCode = nasaResponse.status;
    res.json(await nasaResponse.json());
  } catch(e){
    res.status(500).send({error: "Error fetching nasa data"});
  }
})

app.listen(port, () => {

})
