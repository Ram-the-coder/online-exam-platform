import React, {Component} from 'react';
import {connect} from 'react-redux';

class EnterTestZone extends Component {
	render() {
		return (
			<div>
				<form className="authentication-form">
					<div><h3>Enter Access Code to Start Test</h3></div>							
					<div className="form-group">
						<input
							type = "text"
							className = "form-control"						
							placeholder = "Access Code"
							required
						/>
					</div>
					<button type="submit" className="btn btn-success btn-block">Access</button>
					<span className="info">*Get Access Code From Faculty</span>
				</form>
			</div>

		);
	}
}

export default EnterTestZone;