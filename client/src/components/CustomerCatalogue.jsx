import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CustomerCatalogue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			selectedStore: '',
			stores: [],
			searchQuery: '',
			cart: [],
			quantitySelected: {},
			paymentInfo: {
				cardNumber: '',
				expirationDate: '',
				cvv: '',
			},
		};

		this.handleStoreChange = this.handleStoreChange.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		
		
		if (!CustomerCatalogue.executeSecond) {
			CustomerCatalogue.executeSecond = true;
		}
		else if (CustomerCatalogue.executeSecond) {
			fetch('http://localhost:3001/supermarkets')
			.then((response) => response.json())
			.then((supermarkets) => {
				const storeNames = [];
				const itemDetails = [];
				
				let i = 0;
				supermarkets.forEach((supermarket) => {
					const storeName = supermarket.name;
					storeNames.push(storeName);

					supermarket.inventory.forEach((item) => {
						itemDetails.push({
							index: i,
							store: storeName,
							name: item.name,
							price: item.price,
							expiry: item.expiry,
							quantity: item.quantity,
						});
						i++;
					});
				});
				console.log('Store Names:', storeNames);
				this.setState({stores: storeNames});
				console.log('Item Details:', itemDetails);
				this.setState({products: itemDetails});
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

	addToCart = (product) => {
		const { cart, quantitySelected } = this.state;
		const { name, quantity, price, index } = product;
		const selectedQuantity = quantitySelected[index] || 0;
	
		const totalQuantityInCart = cart.reduce((total, item) => {
			if (item.index === index) {
				return total + item.quantity;
			}
			return total;
		}, 0);
	
		const remainingQuantity = quantity - totalQuantityInCart;
	
		if (selectedQuantity === 0 || selectedQuantity > remainingQuantity) {
			return;
		}
	
		const updatedCart = [...cart];
		updatedCart.push({
			name,
			quantity: selectedQuantity,
			price: price * selectedQuantity,
			index: index,
		});
	
		this.setState({
			cart: updatedCart,
			quantitySelected: { ...quantitySelected, [index]: 0 },
		});
	};

	handleQuantityChange = (index, event) => {
		const { name, value } = event.target;
		const parsedValue = parseInt(value, 10) || 0;

		if (parsedValue < 0 || parsedValue > this.state.products[index].quantity) return;

		this.setState((prevState) => ({
			quantitySelected: {
				...prevState.quantitySelected,
				[name]: parsedValue,
			},
		}));
	};

	removeItemFromCart = (index) => {
		const { cart } = this.state;
		const updatedCart = cart.filter((item) => item.index !== index);
		this.setState({
			cart: updatedCart,
		});
	};

	handlePaymentChange = (event) => {
		const { name, value } = event.target;
		this.setState((prevState) => ({
			paymentInfo: {
				...prevState.paymentInfo,
				[name]: value,
			},
		}));
	};

	render() {
		const { products, selectedStore, searchQuery, cart, paymentInfo } = this.state;

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
				<div className='flex justify-center'>
					<table cellPadding='50'>
						<thead>
							<tr className='text-xl bg-green-200 border-t border-l border-r b-1 rounded-lg border-green-800'>
								<th className='py-2 px-4 border-x border-green-800'>Store</th>
								<th className='py-2 px-4 border-x border-green-800'>Item</th>
								<th className='py-2 px-4 border-x border-green-800'>Expires</th>
								<th className='py-2 px-4 border-x border-green-800'>Price</th>
								<th className='py-2 px-4 border-x border-green-800'>Quantity</th>
								<th className='py-2 px-4 border-x border-green-800'>Add to Cart</th>
								<th className='py-2 px-4 border-x border-green-800'>Selected Quantity</th>
								<th className='py-2 px-4 border-x border-green-800'>Remove</th>
							</tr>
						</thead>
						{filteredProducts.map((product, index) => (
							<tbody className='text-lg' key={index}>
								<tr key={index} className={index % 2 === 0 ? 'bg-green-100' : 'bg-white'}>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>{product.store}</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>{product.name}</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>
										{(() => {
										const expiryDate = new Date(product.expiry);
										const currentDate = new Date();

										const timeDifference = expiryDate - currentDate;
										const daysDifference = Math.floor(timeDifference / (1000*60*60*24));

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
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>
										<button
											onClick={() => this.addToCart(product)}
											className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded'
										>
											Add to Cart
										</button>
									</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>
										<input
											type='number'
											min='0'
											max={product.quantity}
											name={product.index}
											value={this.state.quantitySelected[product.index] || 0}
											onChange={(event) =>
												this.handleQuantityChange(product.index, event)
											}
										/>
									</td>
									<td className={((index === filteredProducts.length - 1) ? ' border-b border-green-800 ' : '') + 'py-2 px-4 border-x border-green-800'}>
										<button
											onClick={() => this.removeItemFromCart(product.index)}
											className='bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded'
										>
											Remove
										</button>
									</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
				<div className='flex justify-center mt-4'>
					<h1 className='text-4xl pb-10 font-display font-bold mt-10'>Cart</h1>
				</div>
				<div className='flex justify-center'>
					<table cellPadding='20'>
						<thead>
							<tr className='text-xl'>
								<th>Item</th>
								<th>Quantity</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody className='text-lg'>
							{cart.map((item, index) => (
								<tr key={index}>
									<td>{item.name}</td>
									<td>{item.quantity}</td>
									<td>${item.price.toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className='flex justify-center mt-6'>
					<h1 className='text-4xl pb-4 font-display font-bold my-10'>Payment Information</h1>
				</div>
				<div className='flex justify-center'>
					<form className='w-full max-w-lg'>
						<div className='flex flex-wrap -mx-3 mb-6'>
							<div className='w-full px-3'>
								<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-card-number'>
									Card Number
								</label>
								<input
									className='appearance-none block w-full bg-slate-200 border border-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
									id='grid-card-number'
									type='text'
									placeholder='1234 5678 9012 3456'
									name='cardNumber'
									value={paymentInfo.cardNumber}
									onChange={this.handlePaymentChange}
								/>
							</div>
						</div>
						<div className='flex flex-wrap -mx-3 mb-6'>
							<div className='w-full px-3'>
								<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-expiration-date'>
									Expiration Date
								</label>
								<input
									className='appearance-none block w-full bg-slate-200 border border-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
									id='grid-expiration-date'
									type='text'
									placeholder='MM/YY'
									name='expirationDate'
									value={paymentInfo.expirationDate}
									onChange={this.handlePaymentChange}
								/>
							</div>
						</div>
						<div className='flex flex-wrap -mx-3 mb-6'>
							<div className='w-full px-3'>
								<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-cvv'>
									CVV
								</label>
								<input
									className='appearance-none block w-full bg-slate-200 border border-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
									id='grid-cvv'
									type='text'
									placeholder='123'
									name='cvv'
									value={paymentInfo.cvv}
									onChange={this.handlePaymentChange}
								/>
							</div>
						</div>
					</form>
				</div>
				<div>
					<Link to='/post-purchase'>
						<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>
							Confirm Purchase
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default CustomerCatalogue;
