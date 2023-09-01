const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv');
dotenv.config();

const pass = process.env.PASSWORD;
const uri = "mongodb+srv://admin:"+pass+"@t3r.kuzpunr.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: 'Hello from server!' });
});

const start = async() => {
	try {
		await mongoose.connect(uri);
		app.listen(PORT, () => {
			console.log(`Server listening on ${PORT}`);
		});
	}
	catch (err) {
		console.log(err.message);
	}
}

start();
