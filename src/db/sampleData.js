const faculty = {
	_id: 'kdopd91n#1d0a28@kd;a',
	username: 'johnsturgis@mit.edu',
	password: '0xkd0a28@kd;a0*jja',
	name: 'John Sturgis',
	tests: []
}

const test1 = {
	_id: 'flkl92#1d0a28@kd;a',
	questions: [],
	facultyId: 'kdopd91n#1d0a28@kd;a',
	testName: 'Sample Test',
	isDeployed: false,
	timeLimit: 90,
	totalMarks: 50,
	requiredStudentDetails: ['Name', 'Registration Number', 'Degree Programme', 'Section', 'Roll number'],
	submittedAnswers: []
}

const answerSheet1 = {
	_id: '19dklal1d0a28kdlksd',
	testId: 'flkl92#1d0a28@kd;a',
	studentDetails: ['Ramvardhan', '121003227', 'B.Tech CSE', 'E', 48],
	answers: [{
			questionSno: 1,
			ans: {
				lang: 'C++',
				code: '#include<iostream>'
			}
			
			marksAwarded: 0
		}, {
			questionSno: 2,
			ans: {
				text: 'No, its not object-oriented'
			},
			marksAwarded: 0
		}],
	evaluated: false,
	totalMarks: 0
}

const question1 = {
	sno: 1, //Serial number
	query: 'Write a factorial program',
	marks: 5,
	type: 'programming',
	studentCanExecute: true
}

const question2 = {
	sno: 2, //Serial number
	query: 'Is C object-oriented?',
	marks: 2,
	type: 'theory'
}




