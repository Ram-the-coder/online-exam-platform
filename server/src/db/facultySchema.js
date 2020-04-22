const mongoose = require('mongoose');
// const Test = require('./testSchema');
const schema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		min: 8
	},
	name: {
		type: String,
	},
	tests: [mongoose.ObjectId]
})

module.exports = mongoose.model('faculty', schema);