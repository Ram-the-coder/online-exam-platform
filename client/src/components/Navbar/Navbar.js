import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutThunk} from '../../actions/thunks';

class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav ml-auto">
						{
							this.props.authStatus
								? (
									<React.Fragment>
										<Link className='nav-item nav-link active' to='/dashboard'>Dashboard<span class="sr-only">(current)</span></Link>
										<Link className='nav-item nav-link' onClick={this.props.logoutThunk}>Logout</Link>
									</React.Fragment>
								)
								: (
									<Link className='nav-item nav-link active' to='/'>Home<span class="sr-only">(current)</span></Link>
								)
						}
					</div>
				</div>
			</nav>
		);
	}
}

export default connect(state => ({
	authStatus: state.user.authStatus
}), {
	logoutThunk
})(Navbar);