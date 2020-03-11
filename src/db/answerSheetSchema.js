const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
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

const answerSheetSchema = mongoose.Schema({
	testId: {
		type: mongoose.Schema.Types.ObjectId(),
		required: true
	},
	studentDetails: {
		type: [mongoose.Schema.Types.Mixed],
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

module.exports = mongoose.model('answerSheet', answerSheetSchema);