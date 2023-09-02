import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.user, // either customer or supermarket
            username: '',
            password: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }


    handleSubmit = (e) => {
        const user = [this.state.username, this.state.password, this.state.type];
		fetch('http://localhost:3001/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
			if (data.error) {
				console.error('Error during sign-in:', data.error);
				alert(data.error);
			}
			else {
				console.log('Sign-In Response:', data.message);
				alert("Sign-in successful");
				// save data to local storage here
				if (this.state.type === "customer") {
					window.location.href = "/portal/customer";
				}
				else if (this.state.type === "supermarket") {
					window.location.href = "/portal/supermarket";
				}
			}
			})
			.catch((error) => {
				console.error('Error during sign-in:', error);
				alert(error);
			});
    }


    render() {
        return (
            <div className='container px-5 mx-auto text-center lg:px-40'>

                <div className='ml-3 mt-5 pb-56'>
                    <header className='text-3xl font-display pb-10'>
                        Login to your account here:
                    </header>

                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder={this.state.type === 'supermarket' ? 'Company' : 'Username'}
                            style={{ textAlign: 'center' }}
                            onChange={this.handleUsernameChange}
                        />
                    </div>  
                    <div className='pb-4'>
                        <input 
                            className='bg-slate-200 hover:bg-slate-300 border border-black'
                            placeholder='Password'
                            type='password'
                            style={{ textAlign: 'center' }}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <div className='space-x-1'>
                        <Link to={'/signup/' + this.state.type}>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 border border-red-700 rounded'>
                                Sign Up
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

export default Login;