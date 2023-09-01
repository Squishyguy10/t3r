import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user, // either customer or supermarket
            username: '',
            password: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {

    }

    render() {
        return (
            <div className='container px-5 mx-auto text-center lg:px-40'>
                <form onSubmit={this.handleSubmit}>
                    <div className='ml-3 mt-5 pb-56'>
                        <header className='text-3xl font-display pb-10'>
                            Login to your account here:
                        </header>

                        <div className='pb-4'>
                            <input 
                                className='bg-slate-200 hover:bg-slate-300 border border-black'
                                placeholder='Username'
                                style={{ textAlign: 'center' }}
                                onChange={this.handleUsernameChange}
                            />
                        </div>  
                        <div>
                            <input 
                                className='bg-slate-200 hover:bg-slate-300 border border-black'
                                placeholder='Password'
                                type='password'
                                style={{ textAlign: 'center' }}
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

export default Login;