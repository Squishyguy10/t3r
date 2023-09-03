import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import { loadGoogleMapsAPI } from './google-maps-api';

class SupermarketSignup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            store: '',
            password: '',
            confirm_password: '',
            phone: '',
            city: '',
            googleMaps: null,
            location: null,
            place: '',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
    }

    componentDidMount() {
        loadGoogleMapsAPI()
			.then((maps) => {
				this.setState({ googleMaps: maps });
			})
			.catch((error) => {
				console.error('Error loading Google Maps API:', error);
			});
    }

    handlePlaceChange = (e) => {
        this.setState({place: e.target.value});
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePhoneChange = (e) => {
        const inputPhone = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedPhone = '';

        inputPhone.length >= 10 ? formattedPhone = `(${inputPhone.substring(0, 3)}) ${inputPhone.substring(3, 6)}-${inputPhone.substring(6, 10)}` : formattedPhone = inputPhone;

        this.setState({phone: formattedPhone});
    }

    handleStoreChange = (e) => {
        this.setState({store: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    
    handleConfirmPasswordChange = (e) => {
        this.setState({confirm_password: e.target.value});
    }


    handleSelect = async (selectedAddress) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            this.setState({location: latLng});
            this.setState({place: selectedAddress});
            console.log('Selected location:', latLng);
        } 
        catch (error) {
            console.error('Error selecting location:', error);
        }
    };


    handleSubmit = (e) => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (emailRegex.test(this.state.email) === false) {
			alert("Invalid email address.");
		}
		else if (this.state.password !== this.state.confirm_password) {
			alert("Password and confirm password fields do not match.");
		}
		else if (this.state.password.length < 8) {
			alert("Password must be 8 characters or longers.");
		}
		else if (this.state.username === "") {
			alert("The username field cannot be blank.");
		}
		else if (this.state.location === null) {
			alert("The location field cannot be blank.");
		}
		else if (this.state.store === "") {
			alert("The store name field cannot be blank.");
		}
		else {
			const user = [this.state.email, this.state.username, this.state.password, this.state.location, "supermarket", this.state.store];
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
				}
				else {
					console.log('Sign-Up Response:', data.message);
					localStorage.setItem("username", this.state.username);
					window.location.href = "/portal/supermarket";
				}
				})
				.catch((error) => {
					console.error('Error during sign-up:', error);
					alert(error);
				});
		}
    }


    render() {
        const { googleMaps } = this.state;
        return (
            <div className='pt-24 sm:grid-cols-2 w-full h-screen'>
                <div className='flex flex-col justify-center'>
                    <div className='max-w-[420px] w-full mx-auto bg-white p-6'>
                        <h2 className='text-4xl font-bold text-center py-6'> CREATE ACCOUNT</h2>

                        <div className='flex flex-col py-2'>
                            <input 
                                className='border p-2'
                                placeholder='Email'
                                type='email'
                                size='40'
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <input 
                                className='border p-2'
                                placeholder='Phone Number (Type like this: 0000000000)'
                                type='tel'
                                size='40'
                                value={this.state.phone}
                                onChange={this.handlePhoneChange}
                            />
                        </div>  
                        <div className='flex flex-col py-2'>
                            <input 
                                className='border p-2'
                                placeholder='Store Name'
                                size='40'
                                onChange={this.handleStoreChange}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <input 
                                className='border p-2'
                                placeholder='Username'
                                size='40'
                                onChange={this.handleUsernameChange}
                            />
                        </div> 
                        <div className='flex flex-col py-2'>
                            <input 
                                className='border p-2'
                                placeholder='Password'
                                type='password'
                                size='40'
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <input 
                                className='border p-2'
                                placeholder='Confirm Password'
                                type='password'
                                size='40'
                                onChange={this.handleConfirmPasswordChange}
                            />
                        </div>
                        <div>
                            {googleMaps && 
                                <div>
                                    <PlacesAutocomplete
                                    value={this.state.place}
                                    onChange={(newPlace) => {this.setState({place: newPlace})}} 
                                    onSelect={this.handleSelect}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div className='flex flex-col py-2'>
                                                <input
                                                    {...getInputProps({
                                                        type: 'search',
                                                        placeholder: 'Location',
                                                        className: 'border p-2',
                                                        size: '40',
                                                    })}
                                                />
                                                <div>
                                                    {loading ? <div>Loading...</div> : null}
                                                    {suggestions.map((suggestion) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    return (
                                                        <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                        })}
                                                        >
                                                        {suggestion.description}
                                                        </div>
                                                    );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                            }
                        </div>
                        <button className='border w-full my-5 py-2 bg-blue-500 hover:bg-blue-700 text-white' onClick={this.handleSubmit}>Submit</button>
                        
                        <div className='flex justify-end'>
                            <Link to={'/login/supermarket'}>
                                <p className='text-blue-500 underline'> Back</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SupermarketSignup;