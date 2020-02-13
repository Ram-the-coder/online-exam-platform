const express = require('express');
const router = express.Router();
const facultyController = require('../../controllers/faculty');

router.post('/login', facultyController.login);
router.post('/signup', facultyController.signup);

module.exports = router;
