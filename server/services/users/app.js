require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const mongoose = require("./config/index.js");
const routes = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening to port: ${port}`);
});
