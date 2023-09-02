import React, { Component } from 'react';

class CustomerCatalogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    store: 'Walmart',
                    name: 'Banana',
                    price: 25,
                    expiry: 3,
                    image: 'basgoong',
                    quantity: 10,
                },
                {
                    store: 'Basgoong',
                    name: 'Laymin HK',
                    price: 15,
                    expiry: 10,
                    image: 'jask',
                    quantity: 50,
                },
            ],
            selectedStore: '',
            stores: ['Walmart', 'Basgoong'],
            searchQuery: '',
            cart: [],
            quantitySelected: {},
        };

        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleStoreChange = (event) => {
        this.setState({ selectedStore: event.target.value });
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    addToCart = (product) => {
        const { cart, quantitySelected } = this.state;
        const { name, quantity, price } = product;
        const selectedQuantity = quantitySelected[name] || 0;
    
        const totalQuantityInCart = cart.reduce((total, item) => {
            if (item.name === name) {
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
        });
    
        this.setState({
            cart: updatedCart,
            quantitySelected: { ...quantitySelected, [name]: 0 },
        });
    };

    handleQuantityChange = (product, event) => {
        const { name, value } = event.target;
        const parsedValue = parseInt(value, 10) || 0;

        if (parsedValue < 0 || parsedValue > product.quantity) return;

        this.setState((prevState) => ({
            quantitySelected: {
                ...prevState.quantitySelected,
                [name]: parsedValue,
            },
        }));
    };

    removeItemFromCart = (product) => {
        const { cart } = this.state;
        const updatedCart = cart.filter((item) => item.name !== product.name);
        this.setState({
            cart: updatedCart,
        });
    };

    render() {
        const { products, selectedStore, searchQuery, cart } = this.state;

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
                            <tr className='text-xl'>
                                <th>Store</th>
                                <th>Item</th>
                                <th>Expires in</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Add to Cart</th>
                                <th>Selected Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        {filteredProducts.map((product, index) => (
                            <tbody className='text-lg' key={index}>
                                <tr className='border-t-2 border-solid border-black'>
                                    <td>{product.store}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        {product.expiry} {product.expiry === 1 ? 'day' : 'days'}
                                    </td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button
                                            onClick={() => this.addToCart(product)}
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded'
                                        >
                                            Add to Cart
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            type='number'
                                            min='0'
                                            max={product.quantity}
                                            name={product.name}
                                            value={this.state.quantitySelected[product.name] || 0}
                                            onChange={(event) =>
                                                this.handleQuantityChange(product, event)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => this.removeItemFromCart(product)}
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
                    <h2 className='text-4xl pb-10 font-display font-bold'>Cart</h2>
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
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CustomerCatalogue;
