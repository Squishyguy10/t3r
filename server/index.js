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
	coordinates: {lat: Number, lng: Number},
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
	coordinates: {lat: Number, lng: Number},
	type: String,
});
const User = mongoose.model('User', userSchema);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


app.post('/signup', async (req, res) => {
	const [email, username, password, coordinates, type, name] = req.body;
	
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
	const [username, password, type] = req.body;

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


app.post('/add-inventory/:username', (req, res) => {
	const {username} = req.params;
	const newItem = req.body.newItem;

	Supermarket.findOne({username})
		.then((store) => {
			if (!store) {
				return res.status(404).json({error: 'Store not found'});
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


app.get('/supermarkets', (req, res) => {
	Supermarket.find()
		.then((supermarkets) => {
			res.status(200).json(supermarkets);
		})
		.catch((err) => {
			console.error('Error retrieving supermarkets data:', err);
			res.status(500).json({error: 'Failed to retrieve supermarkets data'});
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
