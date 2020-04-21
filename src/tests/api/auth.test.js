const Container = require('typedi').Container;

const FacultyServices = require('../../services/facultyServices');
const facultyServicesInstance = Container.get(FacultyServices);
const DB = require('../../db');
const db = Container.get(DB);

const email = "test2@email.com";
const password = "12345678";
const name = "Test_User2";



test('Signup', async done => {
	try {
		await db.init();
		const ofac = await facultyServicesInstance.signup(email, password, name);
		const dfac = await db.getFacultyByEmail(email);
		await db.removeFaculty(email);
		expect({_id: ofac._id, __v: ofac.__v})
			.toEqual({_id: dfac._id, __v: dfac.__v});
		await db.disconnect();
		done();	
	} catch(err) {
		await db.disconnect();
		done(err);
	}
});

test('Login', async done => {
	try {
		await db.init();
		const ofac = await facultyServicesInstance.signup(email, password, name);
		const lfac = await facultyServicesInstance.login(email, password);
		await db.removeFaculty(email);
		const tokenExists = !(!lfac.token);
		expect({_id: ofac._id, password: null, tokenExists: true})
				.toEqual({_id: lfac._id, password: lfac.password, tokenExists});	
		await db.disconnect();
		done();	
	} catch(err) {
		await db.disconnect();
		done(err);	
	}
	
});
