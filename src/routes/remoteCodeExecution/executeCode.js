const express = require("express");
const router = express.Router();
const dockerManager = require('./docker-manager');

router.post('/', async (req, res) => {
	console.log("Registerd request");
	try {
		const result = await dockerManager.executeCode(req.code, req.lang);	
		res.status(200).json({result});
	} catch(err) {
		res.status(400).json({err});
	}
})

module.exports = router;