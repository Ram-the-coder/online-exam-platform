const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const token = req.header('auth-token');
    if (!token) 
    	return res.status(401).send("Access Denied!");

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.faculty = verified;
        next();
    } catch (err) {
        return res.status(400).send("Invalid  Token");
    }
}

module.exports = {
    auth
}