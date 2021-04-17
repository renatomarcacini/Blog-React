const jwt = require('jsonwebtoken');
const variables = require('../bin/configurations/variables');

module.exports = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        try {            
            const verifyCode = await jwt.verify(token, variables.Security.secretKey);
            req.userToken = verifyCode;
            console.log(verifyCode);
            next();
        } catch (err) {
            res.status(401).json({message: `Authentication failed, token is invalid`});
            return;
        }
    }
    else{
        res.status(401).json({message: "Authentication failed, token is required"});
        return;
    }
}