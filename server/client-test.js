fetch('http://localhost:3001/supermarkets')
	.then((response) => response.json())
	.then((supermarkets) => {
		const storeNames = [];
		const itemDetails = [];

		supermarkets.forEach((supermarket) => {
			const storeName = supermarket.name;
			storeNames.push(storeName);

			supermarket.inventory.forEach((item) => {
				itemDetails.push({
					store: storeName,
					name: item.name,
					price: item.price,
					expiry: item.expiry,
					quantity: item.quantity,
				});
			});
		});
		console.log('Store Names:', storeNames);
		console.log('Item Details:', itemDetails);
	})
	.catch((error) => {
		console.error('Error retrieving supermarkets:', error);
	});
