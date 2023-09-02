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
				localStorage.setItem("username", this.state.username);
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
            <div className='pt-24 sm:grid-cols-2 w-full h-screen'>

                <div className='flex flex-col justify-center'>
                    <div className='max-w-[420px] w-full mx-auto bg-white p-6'>
                        <h2 className='text-4xl font-bold text-center py-6'>{this.state.type === 'supermarket' ? 'SUPERMARKET' : 'USER'} LOGIN</h2>
                        <div className='flex flex-col py-2'>
                            <label>{this.state.type === 'supermarket' ? 'Company' : 'Username'}</label>
                            <input className='border p-2' type="text" onChange={this.handleUsernameChange}/>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Password</label>
                            <input className='border p-2' type="password" onChange={this.handlePasswordChange}/>
                        </div>
                        <button className='border w-full my-5 py-2 bg-blue-500 hover:bg-blue-700 text-white' onClick={this.handleSubmit}>Sign In</button>
                        <div className='flex justify-between'>
                            <p className='flex items-center wrap-none'> Don't have an account?</p>

                            <Link to={'/signup/' + this.state.type}>
                                <p className='underline text-blue-500'> Create an account</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;