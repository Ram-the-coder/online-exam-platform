const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
	facultyId: {
		type: mongoose.Schema.Types.ObjectId(),
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
		type: [mongoose.Schema.Types.ObjectId()],
	},
})

module.exports = mongoose.model('test', testSchema);