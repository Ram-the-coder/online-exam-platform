const express = require('express');
const router = express.Router();
const rce = require('../../controllers/remoteCodeExecution');

router.post('/execute', rce.executeCode);

module.exports = router;
