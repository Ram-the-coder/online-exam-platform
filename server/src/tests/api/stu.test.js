const Container = require('typedi').Container;

const StudentServices = require('../../services/studentServices');
const studentServicesInstance = Container.get(StudentServices);

const middlewares = require('../../api/middlewares');
const FacultyServices = require('../../services/facultyServices');
const facultyServicesInstance = Container.get(FacultyServices);

const DB = require('../../db');
const db = Container.get(DB);

const email = "test3@email.com";
const password = "12345678";
const name = "Test_User3";

const sampleTest = {
	"testName": "Sample Test",
	"timeLimit": 90,
	"totalMarks": 50,
	"requiredStudentDetails": ["Name", "Registration Number", "Degree Programme", "Section", "Roll number"],
	"questions": [
			{
				"sno": 1,
				"query": "Write a factorial program",
				"marks": 5,
				"type": "programming",
				"studentCanExecute": true
			}, {
				"sno": 2,
				"query": "Is C object-oriented?",
				"marks": 2,
				"type": "theory"
			}
		]
};		

test('Submit Answer', async done => {
	try {
		await db.init();

		/* Create a Test to which an answer can be submitted to */
		const ofac = await facultyServicesInstance.signup(email, password, name);
		const lfac = await facultyServicesInstance.login(email, password);
		const req = {
			header: () => lfac.token
		}
		await middlewares.auth(req, undefined, () => {});
		

		const createdTest = await facultyServicesInstance.createTest(
								req.faculty._id, 
								sampleTest.questions, 
								sampleTest.testName,
								sampleTest.timeLimit,
								sampleTest.totalMarks,
								sampleTest.requiredStudentDetails );

		await middlewares.auth(req, undefined, () => {});

		facultyServicesInstance.deployTest(req.faculty, createdTest.test._id);

		const retrievedTest = await db.getTest(createdTest.test._id);

		/* Test Created And Deployed */
		/* Now Submit Answer */
		const submission = {
			testId: retrievedTest._id,
			studentDetails: ['Ramvardhan', '121003227', 'B.Tech CSE', 'E', '48'],
			answers: [{
					questionSno: 1,
					ans: {
						lang: 'C++',
						code: '#include<iostream>'
					},					
					marksAwarded: 0
				}, {
					questionSno: 2,
					ans: {
						text: 'No, its not object-oriented'
					},
					marksAwarded: 0
				}],
			evaluated: false,
			totalMarks: []
		}
		
		const submittedSheet = await studentServicesInstance.submitTest(submission);
		const foundAnswerSheet = await db.getAnswerSheet(submittedSheet.answerSheet._id);
		const answerSheet = JSON.parse(JSON.stringify(foundAnswerSheet.answerSheet));

		await db.removeFaculty(email);
		await db.deleteTest(createdTest.test._id);
		await db.deleteAnswerSheet(answerSheet._id);

		delete answerSheet._id;
		delete answerSheet.__v;
		answerSheet.answers = answerSheet.answers.map(answer => {
			delete answer._id;
			return answer;
		});
		submission.testId = submission.testId.toString();
		expect(answerSheet).toEqual(submission);

		await db.disconnect();
		done();	

	} catch(err) {
		await db.disconnect();
		done(err);
	}
});