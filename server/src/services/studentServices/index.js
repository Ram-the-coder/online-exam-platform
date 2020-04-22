const Container = require('typedi').Container;

const DB = require('../../db');
const db = Container.get(DB);

class StudentServices {
	
	async submitTest(submission) {
		try {
			const answerSheet = await db.addAnswerSheet(submission);
			return answerSheet;
		} catch(err) {
			return {err};
		}
	}

}

Container.set("StudentServices", new StudentServices());

module.exports = StudentServices;