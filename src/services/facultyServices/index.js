const db = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function login(email, password) {
	const fac = await db.getFaculty(email);
	if(!fac)
		return { err: "email doesn't exist" };

	const isPassword = await bcrypt.compare(password, fac.password);
	if(isPassword) {
		const token = await jwt.sign({ _id: fac.id }, process.env.SECRET);
		return {
			...fac._doc,
			password: null,
			token
		}
	} else {
		return { err: "wrong password" }
	}
}

async function signup(email, password, name) {
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	const fac = await db.createFaculty(email, hashPassword, name);
	return fac;	
}

module.exports = {
	login, 
	signup
}