const facultyServices = require('../../services/facultyServices');

async function signup(req, res, next) {
	const fac = await facultyServices.signup(req.body.email, req.body.password, req.body.name);
	res.json(fac);
}

async function login(req, res, next) {
	const fac = await facultyServices.login(req.body.email, req.body.password);
	res.json(fac);
}

module.exports = {signup, login};

