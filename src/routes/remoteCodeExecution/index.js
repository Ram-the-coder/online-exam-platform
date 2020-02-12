const express = require('express');
const router = express.Router();
const executeCode = require('./executeCode');

router.use('/execute', executeCode);

module.exports = router;
