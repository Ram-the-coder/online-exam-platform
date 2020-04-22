const mongoose = require('mongoose');
const answerSheetSchema = require('./answerSheetSchema');

const testSchema = new mongoose.Schema({
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
		type: [answerSheetSchema],
	},
})

module.exports = mongoose.model('test', testSchema);