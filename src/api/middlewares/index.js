const Container = require('typedi').Container;
const jwt = require('jsonwebtoken');
const DB = require('../../db');
const db = Container.get(DB);

async function auth(req, res, next) {
	const token = req.header('auth-token');
    if (!token) 
    	return res.status(401).send("Access Denied!");

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        const fac = await db.getFacultyById(verified._id);
        if(!fac)
            return res.status(400).send("Invalid token");

        req.faculty = fac;
        next();
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    auth
}