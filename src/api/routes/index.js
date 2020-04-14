const express = require('express');
const router = express.Router();

const facultyController = require('../../controllers/faculty');
const studentController = require('../../controllers/student');	
// const rce = require('../../controllers/remoteCodeExecution');


// Faculty Routes
	//Auth Routes
	router.post('/faculty/login', facultyController.auth.login);
	router.post('/faculty/signup', facultyController.auth.signup);

	//Test-related routes
	router.get('/faculty/dashboard', facultyController.getDashboard); // Get all details of faculty including tests
	router.get('/faculty/test', facultyController.getTest); // Get the details about a test
	router.post('/faculty/test', facultyController.createTest); // Create a new test
	router.patch('/faculty/test', facultyController.editTest); // Update a test 
	router.delete('/faculty/test', facultyController.deleteTest); // Delete a test
	router.get('/faculty/deployTest', facultyController.deploy.deployTest); // Deploy a test
	router.get('/faculty/undeployTest', facultyController.deploy.undeployTest); // Undeploy a test
	router.post('/faculty/evaluateAnswer', facultyController.evaluateAnswer); // Evaluate an answer sheet

// RCE Routes
// router.post('/rce/execute', rce.executeCode);

// Student routes
router.get('/testzone/test', studentController.getTest); // Get the test if its is deployed
router.post('/testzone/submit', studentController.submitTest); // Submit answers to the test

module.exports = router;