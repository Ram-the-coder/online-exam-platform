const Container = require('typedi').Container;

const StudentServices = require('../../services/studentServices');
const studentServicesInstance = Container.get(StudentServices);

class StudentController {
	async getTest(req, res, next) {

	}

	async submitTest(req, res, next) {
		const test = await studentServicesInstance.submitTest(req.body.submission);
		return test;
	}	
}

Container.set('StudentController', StudentController);

module.exports = StudentController;