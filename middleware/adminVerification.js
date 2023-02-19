const jwt = require('jsonwebtoken');

module.exports=async function(req,res,next) {
    const token=req.header('authtoken');
    if(!token) return res.status(401).send('Access denied');
    try {
        let val = token.replace(/^Bearer\s/, '');
        const adminVerified=jwt.verify(val,'admintoken');
        req.user=adminVerified;
        next();
    }
    catch(err) {
        res.status(400).send('Invalid token');
    }
}
