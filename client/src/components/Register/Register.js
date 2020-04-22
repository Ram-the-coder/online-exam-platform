import React, {Component} from 'react';
import axios from 'axios';

export default class Register extends Component {
	constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            password: '',
            error: '',
        }
    }

    togglePasswordVisibility = (e) => {
        console.log(e);
        console.log(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/faculty/signup`, {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        }).then(res => console.log(res)).catch(err => console.log(err));

        this.setState({
            email: '',
            password: '',
            name: '',
            error: ''
        });

    }

    render() {
        return (
        	<>
                <h3>Sign Up</h3>
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
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value = {this.state.name}
                            onChange={event => this.setState({name: event.target.value}) }
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
                         {/*<span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" onClick = {this.togglePasswordVisibility} />*/}
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Sign Up</button>
                </form>
	        </>

        )
    }
}