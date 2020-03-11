const mongoose = require('mongoose');
const Test = require('./testSchema');

const schema = mongoose.Schema({
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
	tests: [Test]
})

module.exports = mongoose.model('faculty', schema);