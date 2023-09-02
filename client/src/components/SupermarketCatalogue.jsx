import React, { Component } from 'react';

class SupermarketCatalogue extends Component {
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
            type: '',
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
                <div className='flex justify-center'>
                    <table cellPadding='50'>
                        <thead>
                            <tr className='text-xl'>
                                <th>Store</th>
                                <th>Image (REMOVE THIS)</th>
                                <th>Item</th>
                                <th>Expires in</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        {filteredProducts.map((product, index) => (
                            <tbody className='text-lg' key={index}>
                                <tr className='border-t-2 border-solid border-black'>
                                    <td>{product.store}</td>
                                    <td></td>
                                    <td>{product.name}</td>
                                    <td>
                                        {product.expiry} {product.expiry === 1 ? 'day' : 'days'}
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        );
    }
}

export default SupermarketCatalogue;