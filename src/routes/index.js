const rce = require('./remoteCodeExecution');
const express = require('express');
const router = express.Router();

router.use('/rce', rce);

module.exports = router;