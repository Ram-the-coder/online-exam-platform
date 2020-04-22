import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
	constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
        }
    }

    handleSubmit = (e) => {
    	e.preventDefault();

    	axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/faculty/login`, {
    		email: this.state.email,
    		password: this.state.password
    	}).then(res => console.log(res)).catch(err => console.log(err));

    	this.setState({
    		email: '',
    		password: '',
    		error: ''
    	});

    }

    render() {
        return (
        	<>
                <h3>Login</h3>
                <form className="my-form" onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            value = {this.state.email}
                            onChange={event => this.setState({email: event.target.value}) }
                            required
                         />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={event => this.setState({password: event.target.value}) }
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Login</button>
                </form>
	        </>

        )
    }
}