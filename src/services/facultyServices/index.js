const Container = require('typedi').Container;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../../db');


class FacultyServices {

	async login(email, password) {
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

	async signup(email, password, name) {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const fac = await db.createFaculty(email, hashPassword, name);
		return fac;	
	}	

}

Container.set("FacultyServices", new FacultyServices);

module.exports = FacultyServices;