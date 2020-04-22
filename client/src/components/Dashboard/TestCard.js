import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './TestCard.css'

export default function TestCard(props) {
	return (
		<div className="test">
			<Link to={`/dashboard/${props.props._id}`} className="test-name">{props.props.testName}</Link>
			<div className="">{ props.props.isDeployed && <span className="access-code"> Access Code:<i> {props.props._id}</i></span>}</div>
			<div className="">
				{
					props.props.isDeployed 
						? <button className="btn btn-danger btn-deploy">Un-Deploy</button>
						: <button className="btn btn-success btn-deploy">Deploy</button>
				}
			</div>
		</div>
	);
}