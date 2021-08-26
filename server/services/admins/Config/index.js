const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(
	process.env.DB_ATLAS,
	{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "AllyDoc" },
	() => {
		console.log("connect to db");
	}
);

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
	console.log("succesfully connected");
});

module.exports = mongoose;
