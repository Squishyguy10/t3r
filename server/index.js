const express = require('express');
const app = express();
const fetch = require('node-fetch');

const uuid = require('uuid');

const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.URI;
if (!uri) {
	console.error("The MongoDB Atlas URI is missing from the environment variables. Add URI=your uri here to the .env file on an empty line.");
	process.exit();
}
const GMapsKey = process.env.GMAPS_API_KEY;
if (!GMapsKey) {
	console.error("The Google Maps API key is missing from the environment variables. Add GMAPS_API_KEY=your key here to the .env file on an empty line.");
	process.exit();
}

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
			expiry: Date,
			price: Number,
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

const OpenAI = require('openai');
const OpenAIKey = process.env.OPENAI_API_KEY;
if (!OpenAIKey) {
	console.error("The OpenAI key is missing from the environment variables. Add OPENAI_API_KEY=your key here to the .env file on an empty line.");
	process.exit();
}

const fs = require('fs');
const jsonString = fs.readFileSync("survey.json", "utf-8");
const surveyJSON = JSON.parse(jsonString);


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
				throw new Error('Store not found');
			}
			store.inventory.push(newItem);
			return store.save();
		})
		.then(() => {
			res.status(201).json({message: 'Inventory added successfully'});
		})
		.catch((err) => {
			if (err.message === 'Store not found') {
				return res.status(404).json({error: 'Store not found'});
			}
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


const surveyResponses = {};
app.post('/submit_survey', (req, res) => {
	const response = req.body.response;
	const user_id = uuid.v4();
	surveyResponses[user_id] = response;
	
	res.json({success: true, user_id});
});


async function aiGenResults(aiprompt) {
	try {
		const oaiRequest = new OpenAI({apiKey: OpenAIKey, dangerouslyAllowBrowser: true});
		const airesponse = await oaiRequest.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{'role': 'user', 'content': aiprompt}],
		});
		return airesponse.choices[0].message.content;
	}
	catch (error) {
		console.error('Error fetching completion:', error);
		return 'Error occurred while generating text.';
	}
}

app.post('/get_survey_results', async (req, res) => {
	const user_id = req.body.uuid;
	const response = surveyResponses[user_id];
	
	if (!response) {
		res.status(404).json({error: 'User not found'});
	}
	else {
		let aiprompt = "Write a few sentences (just one paragraph) to tell me eloquently how to improve my lifestyle to be more sustainable and also what I'm doing well based on my answers in the Q/A below:\n";
		for (const [question, answer] of Object.entries(response)) {
			let formattedQuestion = surveyJSON[question].title;
			let formattedAnswer = "";
			if ("choices" in surveyJSON[question]) {
				if (Array.isArray(answer)) {
					const formattedAnswerArray = []
					for (const index of answer) {
						formattedAnswerArray.push(surveyJSON[question].choices[index]);
					}
					formattedAnswer = formattedAnswerArray.join(", ");
				}
				else {
					formattedAnswer = surveyJSON[question].choices[answer]
				}
			}
			else {
				formattedAnswer = typeof answer === 'boolean' ? (answer ? 'Yes' : 'No') : answer;
			}
			aiprompt += "Question: " + formattedQuestion + "\n";
			aiprompt += "Answer: " + formattedAnswer + "\n\n";
		}
		
		const result = await aiGenResults(aiprompt);
		if (result) {
			res.json({success: true, result});
		}
		else {
			res.status(500).json({error: 'Failed to generate recommendations'});
		}
	}
});


app.get('/proxy-gmaps', async (req, res) => {
	try {
		const scriptURL = 'https://maps.googleapis.com/maps/api/js?key=' + GMapsKey + '&libraries=places&callback=initMap';
		const scriptResponse = await fetch(scriptURL);

		if (scriptResponse.ok) {
			const scriptText = await scriptResponse.text();
			res.set('Content-Type', 'application/javascript');
			res.send(scriptText);
		}
		else {
			res.status(500).json({error: 'Failed to fetch the script'});
		}
	}
	catch (error) {
		console.error(error);
		res.status(500).json({error: 'An error occurred'});
	}
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
