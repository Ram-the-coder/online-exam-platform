import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getDashboardThunk} from '../../actions/thunks';

import './TestDetails.css';

class TestDetails extends Component {

	constructor() {
		super();
		this.state = {
			test: {}
		}
	}

	componentDidMount() {
		let found = false;
		if(this.props.faculty && this.props.faculty.tests) {
			for(let i=0; i < this.props.faculty.tests.length; ++i) {
				if(this.props.faculty.tests[i]._id === this.props.match.params.testId) 
					found = true;
			}
		}

		if(!found) {
			this.props.getDashboardThunk();
		}
	}

	render() {

		if(!this.props.authStatus)
			return <Redirect to="/" />;

		let test, questions, evaluated;
		if(this.props.faculty && this.props.faculty.tests) {
			console.log(this.props.faculty.tests);
			test = this.props.faculty.tests.filter(test => test._id === this.props.match.params.testId);
			test = test[0];
			if(!test)
				return <Redirect to="/" />;
		}

		console.log(test);

		if(!test)
			return <div>Loading...</div>
		else {
			questions = test.questions.map((question, index) => {
				return ( 
					<div className="question" key={index}>
						<div className="first">
							<span className="sno">{question.sno}. </span>
							<span className="query">{question.query}</span>
						</div>
						<div className="marks col"><b>Marks: </b>{question.marks}</div>
						<div className="type col"><b>Type: </b>{question.type}</div>
						<div className="second row">
						
						</div>
					</div>
				);
			});

			evaluated = (test.submittedAnswers.filter(answer => answer.evaluated === true)).length;
		}

		return (
			<div className="test-details">
				<div className="meta">
					<div className="row">
						<div className="col"><h3>{test.testName}</h3></div>
						<div className="col">
							{
								test.isDeployed
									? <button className="btn btn-danger btn-deploy">Un-Deploy</button>
									: <button className="btn btn-success btn-deploy">Deploy</button>
							}
						</div>
					</div>
					<div>
						{test.isDeployed && <div><b>Acess Code:</b> {test._id}</div>}
						<div><b>Time Limit:</b> {test.timeLimit}</div>
						<div><b>Total Marks:</b> {test.totalMarks}</div>
						<div><b>Submissions Received</b>: {test.submittedAnswers.length}</div>
						<div><b>Submissions Evaluated:</b> {evaluated}/{test.submittedAnswers.length} </div>
						<Link to={`/dashboard/evaluate/${test._id}`}>Evaluate Submissions Now</Link>
					</div>
				</div>
				<div className="questions">
					<h4>Questions</h4>
					{questions}
				</div>
			</div>

		);
	}
}

export default connect(state => ({
	faculty: state.user.faculty,
	authStatus: state.user.authStatus
}), {getDashboardThunk})(TestDetails);