import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {toggleForm} from '../../actions/thunks'
import EnterTestZone from './EnterTestZone';

import './Home.css';

class Home extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<>
				<div className="header row">
					Online Examination Platform
				</div>
				<div className="my-container row">
					<div className="studentSide col">
						<div className="heading">Students</div>
						<EnterTestZone />							 
					</div>
					<div className="facultySide col">
						<div className="heading">Faculties</div>
						<div className="authentication-form">
							{this.props.showLogin ? <Login /> : <Register setLoginState = {this.props.toggleForm} />}
							{
								this.props.showLogin
									? <p>Don't have an account? <span className="sim-link" onClick = {this.props.toggleForm}>Sign Up</span></p>		
									: <p>Already have an account? <span className="sim-link" onClick = {this.props.toggleForm}>Login</span></p>		
							}
							
						</div>
					</div>
				</div>
			</>
		);	
	}
	
}

export default connect(state => ({
	showLogin: state.user.showLogin
}), {toggleForm} )(Home);