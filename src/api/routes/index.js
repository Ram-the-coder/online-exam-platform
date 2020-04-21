const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const Container = require('typedi').Container;

const FacultyController = require('../../controllers/faculty');
const studentController = require('../../controllers/student');	
// const rce = require('../../controllers/remoteCodeExecution');

const facultyControllerInstance = Container.get(FacultyController);

// Faculty Routes
	//Auth Routes
	router.post('/faculty/login', facultyControllerInstance.login);
	router.post('/faculty/signup', facultyControllerInstance.signup);

	//Test-related routes
	router.get('/faculty/dashboard', middlewares.auth, facultyControllerInstance.getDashboard); // Get all details of faculty including tests
	router.get('/faculty/test', middlewares.auth, facultyControllerInstance.getTest); // Get the details about a test
	router.post('/faculty/test', middlewares.auth,facultyControllerInstance.createTest); // Create a new test
	router.patch('/faculty/test', middlewares.auth, facultyControllerInstance.editTest); // Update a test 
	router.delete('/faculty/test', middlewares.auth, facultyControllerInstance.deleteTest); // Delete a test
	router.post('/faculty/deployTest', middlewares.auth, facultyControllerInstance.deployTest); // Deploy a test
	router.post('/faculty/undeployTest', middlewares.auth, facultyControllerInstance.undeployTest); // Undeploy a test
	router.post('/faculty/evaluateAnswer', middlewares.auth, facultyControllerInstance.evaluateAnswer); // Evaluate an answer sheet

// RCE Routes
// router.post('/rce/execute', rce.executeCode);

// Student routes
router.get('/testzone/test', studentController.getTest); // Get the test if its is deployed
router.post('/testzone/submit', studentController.submitTest); // Submit answers to the test

module.exports = router;