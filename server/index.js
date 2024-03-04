require("dotenv").config();

const express = require("express");
const app = express();
const summoner = require("./routes/getSummonner");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/summoner", summoner);

app.listen(3000, "127.0.0.1", () => {
    console.log("Server open!");
});
