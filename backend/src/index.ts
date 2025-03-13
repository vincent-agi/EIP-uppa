import express from "express";
import "./consumer";
import "./aggregator";
import "./database";
import "./deadLetter";
import "./websocket";
import "./priceProducer";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));