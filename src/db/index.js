const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const Faculty = require('./facultySchema');


async function init() {
	await mongoose.connect(uri, {useNewUrlParser: true});
}

async function disconnect() {
	await mongoose.connection.close();
	return;
}

async function getFaculty(email) {
	return await Faculty.findOne({ email });
}

async function createFaculty(email, password, name) {
	const fac = new Faculty({
		email,
		password,
		name
	});

	try {
		const savedFac = await fac.save();
		return savedFac;
	} catch(err) {
		return err;
	}
}

async function removeFaculty(email) {
	const del = await Faculty.deleteOne({email});
}

module.exports = {
	init,
	disconnect,
	getFaculty,
	createFaculty,
	removeFaculty
}


