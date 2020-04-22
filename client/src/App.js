import React, {Component} from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			isLogin: true
		}
	}

	render() {
		return (
			<div className="App">
				<div className="header row">
					Online Examination Platform
				</div>
				<div className="my-container row">
					<div className="studentSide col">
							 
					</div>
					<div className="facultySide col">
						<h2>For Teachers</h2>
						<div className="authentication-form">
							{this.state.isLogin ? <Login /> : <Register />}
							{
								this.state.isLogin
									? <p>Don't have an account? <span className="sim-link" onClick = {() => this.setState({isLogin: false})}>Sign Up</span></p>		
									: <p>Already have an account? <span className="sim-link" onClick = {() => this.setState({isLogin: true})}>Login</span></p>		
							}
							
						</div>
					</div>
				</div>
			</div>
		);	
	}
	
}

export default App;
