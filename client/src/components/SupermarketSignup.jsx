import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import { loadGoogleMapsAPI } from './google-maps-api';
import Key from './google-maps-api-key';

class SupermarketSignup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            company: '',
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
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
    }

    componentDidMount() {
        loadGoogleMapsAPI(Key())
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

    handleStoreChange = (e) => {
        this.setState({store: e.target.value});
    }

    handlePhoneChange = (e) => {
        const inputPhone = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedPhone = '';

        inputPhone.length >= 10 ? formattedPhone = `(${inputPhone.substring(0, 3)}) ${inputPhone.substring(3, 6)}-${inputPhone.substring(6, 10)}` : formattedPhone = inputPhone;

        this.setState({phone: formattedPhone});
    }

    handleCompanyChange = (e) => {
        this.setState({company: e.target.value});
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
        alert(this.state.company + ' ' + this.state.password);
        // Add to database
        // handle everything else 
    }

    render() {
        const { googleMaps } = this.state;
        return (
            <div className='container px-5 mx-auto text-center lg:px-40'>
                <div className='ml-3 mt-5 pb-56'>
                    <header className='text-3xl font-display pb-10'>
                        Make your account here:
                    </header>
                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Email'
                            type='email'
                            size='40'
                            style={{ textAlign: 'center' }}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Phone Number (Type like this: 0000000000)'
                            type='tel'
                            size='40'
                            value={this.state.phone}
                            style={{ textAlign: 'center' }}
                            onChange={this.handlePhoneChange}
                        />
                    </div>  
                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Company'
                            size='40'
                            style={{ textAlign: 'center' }}
                            onChange={this.handleCompanyChange}
                        />
                    </div>
                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Store'
                            size='40'
                            style={{ textAlign: 'center' }}
                            onChange={this.handleStoreChange}
                        />
                    </div> 
                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Password'
                            type='password'
                            size='40'
                            style={{ textAlign: 'center' }}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Confirm Password'
                            type='password'
                            size='40'
                            style={{ textAlign: 'center' }}
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
                                        <div>
                                            <input
                                                {...getInputProps({
                                                type: 'search',
                                                placeholder: 'Location',
                                                className: 'bg-slate-200 hover:bg-slate-300 border border-black text-center mb-4',
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
                        <pre>{JSON.stringify(this.state.location)}</pre>
                    </div>
                    <div className='space-x-3'>
                        <Link to={'/login/customer'}>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 border border-red-700 rounded'>
                                Go Back
                            </button>
                        </Link>
                        <button onClick={this.handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 border border-blue-700 rounded'>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SupermarketSignup;