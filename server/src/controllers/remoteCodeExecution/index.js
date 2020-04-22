const codeExecutionService = require('../../services/codeExecutionService');

async function executeCode (req, res, next) {
	console.log("Registerd request");
	try {
		const result = await codeExecutionService.executeCode(req.code, req.lang);	
		res.status(200).json({result});
	} catch(err) {
		res.status(400).json({err});
	}
}

module.exports = {executeCode};