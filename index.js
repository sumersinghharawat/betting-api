const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/allDataForCountry', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.race2win.com/api/mc/sport-fixture?active=true');
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/getTimesOfRacing', async (req, res) => {
  try {
    const { id } = req.query;
    const { data } = await axios.get(`https://www.race2win.com/api/mc/sport-fixture/cached/${id}`);
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/getLiveRaceData', async (req, res) => {
  try {
    const { id, streamId } = req.query;
    const { data } = await axios.get(`https://www.race2win.com/api/mc/sport-fixture/${id}/stream-url?uid=0d65be46-7811-44c6-8733-41409c37e13a&streamId=${streamId}`);
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export const handler = serverless(app);

