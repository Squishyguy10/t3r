fetch('http://localhost:3001/supermarkets')
	.then((response) => response.json())
	.then((supermarkets) => {
		console.log('Supermarkets Data:', supermarkets);
	})
	.catch((error) => {
		console.error('Error retrieving supermarkets:', error);
	});
