import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SupermarketCatalogue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			selectedStore: '',
			stores: [],
			searchQuery: '',
			type: '',
		};
		
		this.handleStoreChange = this.handleStoreChange.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);


		if (!SupermarketCatalogue.executeSecond) {
			SupermarketCatalogue.executeSecond = true;
		}
		else if (SupermarketCatalogue.executeSecond) {
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
					this.setState({ stores: storeNames });
					console.log('Item Details:', itemDetails);
					this.setState({ products: itemDetails });
				})
				.catch((error) => {
					console.error('Error retrieving supermarkets:', error);
				});
		}
	}



	handleStoreChange = (event) => {
		this.setState({ selectedStore: event.target.value });
	};

	handleSearchChange = (event) => {
		this.setState({ searchQuery: event.target.value });
	};

	render() {
		const { products, selectedStore, searchQuery } = this.state;

		const filteredByStore = selectedStore === '' ? products : products.filter((product) => product.store === selectedStore);

		const filteredProducts = filteredByStore.filter((product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase())
		);

		return (
			<div className='container px-5 pt-16 mx-auto text-center lg:px-40 pb-80'>
				<div className='mb-4 flex justify-center'>
					<label htmlFor='storeFilter' className='text-xl mr-2'>
						Filter by Store:
					</label>
					<select
						id='storeFilter'
						className='border border-black rounded px-2 py-1 bg-slate-200 hover:bg-slate-300'
						value={selectedStore}
						onChange={this.handleStoreChange}
					>
						<option value=''>All Stores</option>
						{this.state.stores.map((store, index) => (
							<option value={store} key={index}>
								{store}
							</option>
						))}
					</select>
				</div>
				<div className='mb-4 flex justify-center'>
					<label htmlFor='searchBar' className='text-xl mr-2'>
						Search for Items:
					</label>
					<input
						type='text'
						id='searchBar'
						className='border border-black rounded px-2 py-1 bg-slate-200 hover:bg-slate-300'
						value={searchQuery}
						onChange={this.handleSearchChange}
					/>
				</div>
				<div>
					<Link to='/add-item'>
						<button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 border border-slate-700 rounded'>
							Add Item
						</button>
					</Link>
				</div>
				<div className='flex justify-center'>
					<table className='table-auto w-full mt-10'>
						<thead>
							<tr className='text-xl bg-green-200 border-t border-l border-r b-1 rounded-lg border-green-800'>
								<th className='py-2 px-4 border-x border-green-800'>Store</th>
								<th className='py-2 px-4 border-x border-green-800'>Item</th>
								<th className='py-2 px-4 border-x border-green-800'>Expires</th>
								<th className='py-2 px-4 border-x border-green-800'>Price</th>
								<th className='py-2 px-4 border-x border-green-800'>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map((product, index) => (
								<tr key={index} className={index % 2 === 0 ? 'bg-green-100' : 'bg-white'}>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>{product.store}</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>{product.name}</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>
										{(() => {
											const expiryDate = new Date(product.expiry);
											const currentDate = new Date();

											const timeDifference = expiryDate - currentDate;
											const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

											if (daysDifference > 0) {
												return `In ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'}`;
											} else if (daysDifference < 0) {
												return `${-daysDifference} ${-daysDifference === 1 ? 'day' : 'days'} ago`;
											} else {
												return 'Today';
											}
										})()}
									</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>${product.price.toFixed(2)}</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>{product.quantity}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default SupermarketCatalogue;