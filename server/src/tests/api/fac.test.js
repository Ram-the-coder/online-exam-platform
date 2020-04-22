const Container = require('typedi').Container;

const middlewares = require('../../api/middlewares');
const FacultyServices = require('../../services/facultyServices');
const facultyServicesInstance = Container.get(FacultyServices);
const DB = require('../../db');
const db = Container.get(DB);

const email = "test@email.com";
const password = "12345678";
const name = "Test_User1";

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

test('Get Dashboard', async done => {
	try {
		await db.init();
		const ofac = await facultyServicesInstance.signup(email, password, name);
		const lfac = await facultyServicesInstance.login(email, password);
		const req = {
			header: () => lfac.token
		}
		await middlewares.auth(req, undefined, () => {});
		let ffac = await facultyServicesInstance.getDashboard(req.faculty);
		await db.removeFaculty(email);
		expect({_id: ofac._id, password: null, tests: JSON.stringify(ofac.tests)})
				.toEqual({_id: ffac._id, password: ffac.password, tests: JSON.stringify(ffac.tests)});	
		await db.disconnect();
		done();	
	} catch(err) {
		await db.disconnect();
		done(err);	
	}
})

test('Create Test', async done => {
	try {
		await db.init();
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

		const retrievedTest = await db.getTest(createdTest.test._id);
		
		const ufac = await db.getFacultyById(req.faculty._id);

		expect({
			facultyId: retrievedTest.facultyId,
			testName: retrievedTest.testName,
			timeLimit: retrievedTest.timeLimit,
			totalMarks: retrievedTest.totalMarks,
			requiredStudentDetails: JSON.stringify(retrievedTest.requiredStudentDetails),
			questions: JSON.stringify(retrievedTest.questions),
			tests: JSON.stringify(ufac.tests)
		}).toEqual({
			facultyId: req.faculty._id,
			...sampleTest,
			questions: JSON.stringify(sampleTest.questions),
			requiredStudentDetails: JSON.stringify(sampleTest.requiredStudentDetails),
			tests: JSON.stringify([retrievedTest._id])
		});

		await db.removeFaculty(email);
		await db.deleteTest(createdTest.test._id);
		await db.disconnect();
		done();	

	} catch(err) {
		await db.disconnect();
		done(err);
	}
});

test('Deploy Test', async done => {
	try {
		await db.init();
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

		await db.removeFaculty(email);
		await db.deleteTest(createdTest.test._id);
		
		expect(retrievedTest.isDeployed).toBe(true);

		await db.disconnect();
		done();	

	} catch(err) {
		await db.disconnect();
		done(err);
	}
})