import axios from "axios";
import express, { Router } from "express";
import serverless from "serverless-http";

const app = express();
const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

app.use("/api/", router);

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

export const handler = serverless(app);
