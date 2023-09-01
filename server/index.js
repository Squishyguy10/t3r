const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.URI;

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// Define MongoDB schemas and models
const supermarketSchema = new mongoose.Schema({
	name: String,
	location: {
		type: { type: String, default: 'Point' },
		coordinates: [Number, Number],
	},
	inventory: [
		{
			name: String,
			quantity: Number,
			expirationDate: Date,
			originalPrice: Number,
			currentPrice: Number,
		},
	],
});
const Supermarket = mongoose.model('Supermarket', supermarketSchema);

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/store/:storeId/inventory', (req, res) => {
	// JWT secure stuff maybe later

	const storeId = req.params.storeId;

	Supermarket.findById(storeId)
		.then((store) => {
			if (!store) {
				return res.status(404).json({error: 'Store not found'});
			}
			res.status(200).json(store.inventory);
		})
		.catch((err) => {
			console.error('Error retrieving store inventory:', err);
			res.status(500).json({error: 'Failed to retrieve store inventory'});
		});
});


app.get('/items/:itemName', (req, res) => {
	const itemName = req.params.itemName;

	Supermarket.find({'inventory.name': itemName})
		.then((supermarkets) => {
			if (supermarkets.length === 0) {
				return res.status(404).json({error: 'Item not found at any store'});
			}
			const result = supermarkets.map((supermarket) => {
				const item = supermarket.inventory.find((i) => i.name === itemName);
				return {
					supermarketName: supermarket.name,
					location: supermarket.location,
					quantity: item.quantity,
				};
			});
			res.status(200).json(result);
		})
		.catch((err) => {
			console.error('Error retrieving item data:', err);
			res.status(500).json({error: 'Failed to retrieve item data'});
		});
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
