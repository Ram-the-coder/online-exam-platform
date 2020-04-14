const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const Faculty = require('./facultySchema');


async function init() {
	await mongoose.connect(uri, {useNewUrlParser: true});
}

async function disconnect() {
	await client.close();
	return;
}

module.exports = {
	init
}


