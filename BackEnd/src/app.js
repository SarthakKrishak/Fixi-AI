const express = require("express");
const aiRoute = require("./routes/ai.routes");
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://fixi-ai.vercel.app', // or use '*' for any origin (not recommended for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/ai", aiRoute);

module.exports = app;
