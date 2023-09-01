const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.URI;

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const supermarketSchema = new mongoose.Schema({
	username: String,
	name: String,
	coordinates: [Number, Number],
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

const userSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
	coordinates: [Number, Number],
	type: String,
});
const User = mongoose.model('User', userSchema);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


app.post('/signup', async (req, res) => {
	const {email, username, password, coordinates, type, name} = req.body;
	
	const existingUser = await User.findOne({$or: [{username}, {email}]});
	
	if (existingUser) {
		return res.status(400).json({error: 'Username or email already has an account'});
	}
	
	const newUser = new User({
		email,
		username,
		password, //hash for security at some point
		coordinates,
		type,
	});

	newUser
		.save()
		.then(() => {
			if (type === 'supermarket') {
				let inventory = [];
				const newSupermarket = new Supermarket({
					username,
					name,
					coordinates,
					inventory,
				});
				return newSupermarket.save();
			}
		})
		.then(() => {
			res.status(201).json({message: `${username} (${type}) registered successfully`});
		})
		.catch((err) => {
			console.error(`Error registering ${username} (${type}):`, err);
			res.status(500).json({error: `Failed to register ${username} (${type})`});
		});
});


app.post('/signin', (req, res) => {
	console.log(req);
	const {username, password, type} = req.body;

	User.findOne({username, password, type})
		.then((user) => {
			if (!user) {
				return res.status(401).json({error: 'Invalid credentials'});
			}
			res.status(200).json({message: `${username} (${type}) signed in successfully`});
		})
		.catch((err) => {
			console.error(`Error signing in ${username} (${type}):`, err);
			res.status(500).json({error: `Failed to sign in ${username} (${type})`});
		});
});



app.post('/store/:storeId/add-inventory', (req, res) => {
	const storeId = req.params.storeId;
	const newItem = req.body.newItem;

	Supermarket.findById(storeId)
		.then((store) => {
			if (!store) {
				return res.status(404).json({ error: 'Store not found' });
			}
			store.inventory.push(newItem);
			return store.save();
		})
		.then(() => {
			res.status(201).json({message: 'Inventory added successfully'});
		})
		.catch((err) => {
			console.error('Error adding inventory:', err);
			res.status(500).json({error: 'Failed to add inventory'});
		});
});


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
