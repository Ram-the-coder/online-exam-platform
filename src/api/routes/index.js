const rce = require('./rceRoutes');
const faculty = require('./facultyRoutes');
const express = require('express');
const router = express.Router();

router.use('/rce', rce);
router.use('/faculty', faculty);

module.exports = router;