const mongoose = require('mongoose');
// const Test = require('./testSchema');
const Test = new mongoose.Schema({
	facultyId: {
		type: mongoose.ObjectId,
		required: true,
	},
	testName: {
		type: String,
		required: true
	},
	questions: {
		type: Array,
		required: true
	},
	isDeployed: {
		type: Boolean,
		required: true
	},
	timeLimit: {
		type: Number,
	},
	totalMarks: {
		type: Number
	},
	requiredStudentDetails: {
		type: [String],
		required: true
	},
	submittedAnswers: {
		type: [mongoose.ObjectId],
	},
})

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
	tests: [Test]
})

module.exports = mongoose.model('faculty', schema);