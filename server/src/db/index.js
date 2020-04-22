const Container = require('typedi').Container;
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const Faculty = require('./facultySchema');
const Test = require('./testSchema');
const AnswerSheet = require('./answerSheetSchema');

class DB {

	async init() {
		await mongoose.connect(uri, {useNewUrlParser: true});
	}

	async disconnect() {
		await mongoose.connection.close();
		return;
	}

	async getFacultyByEmail(email) {
		const fac = await Faculty.findOne({ email });
		return fac;
	}

	async getFacultyById(facId) {
		const fac = await Faculty.findById(facId);
		return fac;
	}

	async createFaculty(email, password, name) {
		const fac = new Faculty({
			email,
			password,
			name
		});

		try {
			const savedFac = await fac.save();
			return savedFac;
		} catch(err) {
			return err;
		}
	}

	async removeFaculty(email) {
		const del = await Faculty.deleteOne({email});
	}

	async createTest(facultyId, questions, testName, timeLimit, totalMarks, requiredStudentDetails) {
		const test = new Test({facultyId, questions, testName, timeLimit, totalMarks, requiredStudentDetails});
		try {
			const savedTest = await test.save();
			return {test: savedTest};
		} catch(err) {
			return {err};
		}
	}

	async addTest(facId, testId) {
		try {
			let fac = await this.getFacultyById(facId);
			fac.tests.push(testId);
			await fac.save();
			return fac;
		} catch(err) {
			return {err};
		}
	}

	async getTest(testId) {
		let test = await Test.findById(testId);
		// console.log(test);
		return test;
	}

	async deleteTest(testId) {
		try {
			// console.log(testId);
			await Test.deleteOne({_id: testId});
		} catch(err) {
			console.error(err);
		}
	}

	async deployTest(testId) {
		const test = await Test.findOneAndUpdate({_id: testId}, {isDeployed: true});
		return test;
	}

	async addAnswerSheet(submission) {
		try {
			let answerSheet = new AnswerSheet(submission);
			answerSheet = await answerSheet.save();
			const test = await this.getTest(submission.testId);
			test.submittedAnswers.push(answerSheet._id);
			return {answerSheet};
		} catch(err) {
			return {err};
		}
	}

	async getAnswerSheet(_id) {
		try {
			const answerSheet = await AnswerSheet.findById(_id);
			return {answerSheet};
		} catch(err) {
			return {err};
		}
	}

	async deleteAnswerSheet(_id) {
		try {
			await AnswerSheet.deleteOne({_id});
		} catch(err) {
			console.error(err);
		}
	}
}

Container.set("DB", new DB());

module.exports = DB;