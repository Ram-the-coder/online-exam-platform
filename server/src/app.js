const Container = require('typedi').Container;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./api/routes');
const DB = require('./db');
const db = Container.get(DB);

const app = express();

/* Body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* CORS */
app.use(cors());

/* Set public directory */
app.use(express.static(path.join(__dirname, '../public')));

/* Set routes */
app.use('/api', routes);

/* Listen on port */
const server = app.listen(process.env.PORT, () => console.log("Server listening on port " + process.env.PORT));

db.init().then(() => {
	console.log("Connected to database");
}).catch(err => {
	console.log(err);
});

/* Handle process terminating signals */
/* If a process terminating signal is received, terminate the databse connection and then stop the server */
const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
sigs.forEach(sig => {
	process.on(sig, () => {
		
		db.disconnect().then(() => {
			console.log("Database connection closed");
		}).catch(err => {
			console.log(err);
		});

		console.log('Closing node.js server...')
		server.close()
	})
})