const express = require('express')
const aiRoute = require('./routes/ai.routes')
const app = express()
const cors = require('cors');

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // If you're handling JSON requests


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/ai", aiRoute)

module.exports = app;