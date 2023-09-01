let mode = "up";

const email = "suberman@example.com";
const username = "fortinos-suberman";
const password = "password123";
const coordinates = [0, 0];
const type = "supermarket";
const name = "Suberman's Butcher Shop";

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
		console.log(data.message);
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
