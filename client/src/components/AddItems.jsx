import React, { Component } from 'react';

class AddItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            price: '',
            expiry: '',
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleExpiryChange = this.handleExpiryChange.bind(this);

    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleQuantityChange = (e) => {
        this.setState({ quantity: e.target.value.replace(/\D/g, '') });
    }

    handlePriceChange = (e) => {
        const inputPrice = e.target.value;
    
        const validPrice = inputPrice.replace(/[^0-9.]/g, '');
        const decimalParts = validPrice.split('.');

        if (inputPrice.replace(/0/g, '').trim() === '') {
            this.setState({ price: '' });
        }
        else if (decimalParts.length >= 2) {
            const integerPart = decimalParts[0];
            const decimalPart = decimalParts[1].slice(0, 2);
            const formattedPrice = `${integerPart}.${decimalPart}`;
            this.setState({ price: formattedPrice });
        } 
        else {
            this.setState({ price: validPrice });
        }
    }

    handleExpiryChange = (e) => {
		this.setState({expiry: e.target.value});
	}


    handleSubmit = (e) => {
		const username = localStorage.getItem("username");
		if (username === null) {
			alert("You are not signed in!");
			window.location.href("/supermarket-hub");
		}
		else if (this.state.name === "") {
			alert("The item name field cannot be blank.");
		}
		else if (this.state.quantity === "") {
			alert("The quantity field cannot be blank.")
		}
		else if (parseInt(this.state.quantity) === 0) {
			alert("The quantity cannot be 0. How do you expect us to sell 0 of something?");
		}
		else if (this.state.price === "") {
			alert("The price field cannot be blank.");
		}
		else if (this.state.expiry === "") {
			alert("The expiration date field cannot be blank.");
		}
		else {
			const newItem = {
				name: this.state.name,
				quantity: parseInt(this.state.quantity),
				expiry: this.state.expiry,
				price: parseFloat(this.state.price),
			};
		
			fetch(`http://localhost:3001/add-inventory/${username}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({newItem}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Item added successfully:', data.message);
					alert("Item added successfully.");
				})
				.catch((error) => {
					console.error('Error adding item:', error);
					alert(error);
				});
		}
    }


    render() {
        return (
            <div className='container px-5 mx-auto text-center lg:px-40'>
                <div className='ml-3 mt-5 pb-56'>
                    <header className='text-3xl font-display pb-10'>
                        Enter item information here:
                    </header>
                    <div className='pb-4'>
                        <input
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Item Name'
                            size='40'
                            style={{ textAlign: 'center' }}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div className='pb-4'>
                        <input
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Quantity'
                            size='40'
                            value={this.state.quantity}
                            style={{ textAlign: 'center' }}
                            onChange={this.handleQuantityChange}
                        />
                    </div>
                    <div className='pb-4'>
                        <input
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Price per Item (Dollars)'
                            size='40'
                            value={this.state.price}
                            style={{ textAlign: 'center' }}
                            onChange={this.handlePriceChange}
                        />
                    </div>
                    <div className='pb-4'>
                        <input
							type='text'
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Expiry Date'
                            size='40'
                            value={this.state.expiry}
                            style={{ textAlign: 'center', width: '330px' }}
                            onChange={this.handleExpiryChange}
							onFocus={(e) => {
								e.target.type = 'date';
							}}
							onBlur={(e) => {
								e.target.type = 'text';
							}}
                        />
                    </div>
                    <button onClick={this.handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 border border-blue-700 rounded'>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default AddItems;