import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CustomerSignup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            confirm_password: '',
            phone: '',
            city: '',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePhoneChange = (e) => {
        const inputPhone = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedPhone = '';

        if (inputPhone.length >= 10) formattedPhone = `(${inputPhone.substring(0, 3)}) ${inputPhone.substring(3, 6)}-${inputPhone.substring(6, 10)}`;
        else formattedPhone = inputPhone;

        this.setState({phone: formattedPhone});
        
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    
    handleConfirmPasswordChange = (e) => {
        this.setState({confirm_password: e.target.value});
    }


    handleSubmit = (e) => {
        alert(this.state.username + ' ' + this.state.password);
        // Add to database
        // handle everything else 
    }

    render() {
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
                            placeholder='Username'
                            size='40'
                            style={{ textAlign: 'center' }}
                            onChange={this.handleUsernameChange}
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

export default CustomerSignup;