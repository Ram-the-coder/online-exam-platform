import React, {Component} from 'react';

import './Test.css'

export default function Test(props) {
	return (
		<div className="test">
			<div className="test-name">{props.props.testName}</div>
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