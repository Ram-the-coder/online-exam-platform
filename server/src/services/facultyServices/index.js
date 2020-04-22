const Container = require('typedi').Container;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const DB = require('../../db');
const db = Container.get(DB);

class FacultyServices {

	async login(email, password) {
		const fac = await db.getFacultyByEmail(email);
		if(!fac)
			return { err: "email doesn't exist" };

		const isPassword = await bcrypt.compare(password, fac.password);
		if(isPassword) {
			const token = await jwt.sign({ _id: fac.id }, process.env.SECRET);
			return {
				...fac._doc,
				password: null,
				token
			}
		} else {
			return { err: "wrong password" }
		}
	}

	async signup(email, password, name) {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const fac = await db.createFaculty(email, hashPassword, name);
		return fac;	
	}	

	async getDashboard(faculty) {
		// console.log(faculty);
		return {...faculty._doc, password: null};
	}

	async createTest(facId, questions, testName, timeLimit, totalMarks, reqStuDetails) {
		const test = await db.createTest(facId, questions, testName, timeLimit, totalMarks, reqStuDetails);
		await db.addTest(facId, test.test._id);
		return test;
	}

	async deployTest(fac, testId) {
		if(!fac.tests.includes(testId))
			return {err: "No such test created by you"};

		let test = await db.deployTest(testId);
		return test;
	}

}

Container.set("FacultyServices", new FacultyServices());

module.exports = FacultyServices;