let mode = "add-item";

const email = "suberman@example.com";
const username = "fortinos-suberman";
const password = "password123";
const coordinates = [0, 0];
const type = "supermarket";
const name = "Suberman's Butcher Shop";



if (mode == "add-item") {
	const addItemForm = document.getElementById('addItemForm');

	const newItem = {
		name: "Banana",
		quantity: 5,
		expirationDate: '2023-12-31',
		originalPrice: 3.00,
		currentPrice: 3.50,
	};

	fetch(`http://localhost:3001/add-inventory/${username}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ newItem }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Item added successfully:', data.message);
		})
		.catch((error) => {
			console.error('Error adding item:', error);
		});
}


if (mode == "get-items") {
	fetch('http://localhost:3001/supermarkets')
		.then((response) => response.json())
		.then((supermarkets) => {
			console.log('Supermarkets Data:', supermarkets);
		})
		.catch((error) => {
			console.error('Error retrieving supermarkets:', error);
		});
}


if (mode == "up") {
	const user = {email, username, password, coordinates, type, name};

	fetch('http://localhost:3001/signup', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.then((data) => {
		if (data.error) {
			console.error('Error during sign-up:', data.error);
			alert(data.error);
		} else {
			console.log('Sign-Up Response:', data.message);
		}
		})
		.catch((error) => {
			console.error('Error during sign-up:', error);
		});
}


if (mode == "in") {
	const user = {username, password, type};

	fetch('http://localhost:3001/signin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Sign-In Response:', data.message);
		})
		.catch((error) => {
			console.error('Error during sign-in:', error);
		});
}
