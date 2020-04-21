const Container = require('typedi').Container;
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const Faculty = require('./facultySchema');

class DB {

	async init() {
		await mongoose.connect(uri, {useNewUrlParser: true});
	}

	async disconnect() {
		await mongoose.connection.close();
		return;
	}

	async getFaculty(email) {
		return await Faculty.findOne({ email });
	}

	async createFaculty(email, password, name) {
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

	async removeFaculty(email) {
		const del = await Faculty.deleteOne({email});
	}
}

Container.set("DB", new DB());

module.exports = DB;