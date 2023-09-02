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
					if (data.error) {
						console.error('Error during item submission:', data.error);
						alert(data.error);
					}
					else {
						console.log('Item added successfully:', data.message);
						window.location.href = "/catalogue/supermarket";
					}
				})
				.catch((error) => {
					console.error('Error adding item:', error);
					alert(error);
				});
		}
    }

    render() {
        return (
            <div className='pt-24 sm:grid-cols-2 w-full h-screen'>
                <div className='flex flex-col justify-center'>
                    <div className='max-w-[480px] w-full mx-auto bg-white p-6'>
                        <h2 className='text-4xl font-bold text-center py-6'>Enter Item Information</h2>
                        <div className='flex flex-col py-2'>
                            <input
                                className='border p-2'
                                placeholder='Item Name'
                                size='40'
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <input
                                className='border p-2'
                                placeholder='Quantity'
                                size='40'
                                value={this.state.quantity}
                                onChange={this.handleQuantityChange}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <input
                                className='border p-2'
                                placeholder='Price per Item (Dollars)'
                                size='40'
                                value={this.state.price}
                                onChange={this.handlePriceChange}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <input
                                type='text'
                                className='border p-2'
                                placeholder='Expiry Date'
                                size='40'
                                value={this.state.expiry}
                                style={{ width: '432px' }}
                                onChange={this.handleExpiryChange}
                                onFocus={(e) => {
                                    e.target.type = 'date';
                                }}
                                onBlur={(e) => {
                                    e.target.type = 'text';
                                }}
                            />
                        </div>
                        <button className='border w-full my-5 py-2 bg-blue-500 hover:bg-blue-700 text-white' onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddItems;