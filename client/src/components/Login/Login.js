import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {loginThunk} from '../../actions/thunks';
import { connect } from 'react-redux';

class Login extends Component {
	constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    handleSubmit = (e) => {
    	e.preventDefault();

    	this.props.loginThunk(this.state.email, this.state.password);

    	this.setState({
    		email: '',
    		password: '',
    		error: ''
    	});

    }

    render() {
        
        if(this.props.authStatus)
            return (<Redirect to="/dashboard" />);

        return (
        	<>
                <h3>Faculty Login</h3>
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

export default connect( state => ({authStatus: state.user.authStatus}), {loginThunk})(Login)