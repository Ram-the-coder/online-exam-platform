import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import TestDetails from './components/Test/TestDetails';
import { authStateRefresh } from './actions/thunks';

import './App.css';

class App extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
		this.props.authStateRefresh();
	}

	render() {
		return (
			<BrowserRouter>
				<div className='App'>
					<Navbar />
					<Switch>
						<Route path='/dashboard/:testId' component = {TestDetails} />
						<Route exact path='/dashboard' component = {Dashboard} />
						<Route exact path = '/' component = {Home} />
						<Redirect from='*' to='/' />
					</Switch>
					
				</div>
			</BrowserRouter>
		);	
	}
	
}

export default connect(null, {authStateRefresh})(App);