const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
	questionSno: {
		type: Number,
		required: true
	},
	ans: {
		type: mongoose.Schema.Types.Mixed
	},
	marksAwarded: {
		type: Number
	}
})

const answerSheetSchema = new mongoose.Schema({
	testId: {
		type: mongoose.ObjectId,
		required: true
	},
	studentDetails: {
		type: [String],
		required: true,
	},
	answers: {
		type: [answerSchema],
		required: true
	},	
	evaluated: {
		type: Boolean,
		required: true
	},
	totalMarks: {
		type: Array
	}
})

module.exports = answerSheetSchema;