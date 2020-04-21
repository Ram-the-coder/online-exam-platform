const Container = require('typedi').Container;

const FacultyServices = require('../../services/facultyServices');
const facultyServicesInstance = Container.get(FacultyServices);

class FacultyController {

	async signup(req, res, next) {
		const fac = await facultyServicesInstance.signup(req.body.email, req.body.password, req.body.name);
		res.json(fac);
	}

	async login(req, res, next) {
		const fac = await facultyServicesInstance.login(req.body.email, req.body.password);
		res.json(fac);
	}	

	/** 
	  * @api_params faculty(get this from auth middleware): Object 
	  * @api_params questions: Array of Question objects
	  * @api_params time_limit: Number
	  * @api_params totalMarks: Number
	  * @api_params description: String
	*/
	createTest(req, res, next) {

	}

	/** 
	  * @api_params faculty(get this from auth middleware): Object  
	  * @api_params id(test id): String
	*/
	deleteTest(req, res, next) {
	
	}

	/** 
	  * @api_params faculty(get this from auth middleware): Object  
	  * @api_params id(test id): String
	*/
	deployTest(req, res, next) {

	}

	undeployTest(req, res, next) {
		
	}

	/** 
	  * @api_params faculty(get this from auth middleware): Object 
	  * @api_params questions: Array of Question objects
	  * @api_params time_limit: Number
	  * @api_params totalMarks: Number
	  * @api_params description: String
	*/
	editTest(req, res, next) {

	}

	/** 
	  * @api_params faculty(get this from auth middleware): Object  
	  * @api_params test_id: String
	  * @api_params answer_id: String
	  * @api_params answerSheet: Object
	*/
	evaluateAnswer(req, res, next) {

	}

	/** 
	  * @api_params faculty(get this from auth middleware): Object 
	*/
	getDashboard(req, res, next) {
	
	}

	/** 
	  * @api_params faculty(get this from auth middleware): Object  
	  * @api_params id(test id): String
	*/
	getTest(req, res, next) {

	}
}

Container.set('FacultyContoller', new FacultyController());

module.exports = FacultyController;