const jwt = require("jsonwebtoken")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. 
    //Check readme for the exact headers to be expected
    const authorization = req.headers.authorization;
    const words = authorization.split(" ");
    const token = words[1];
    const decode = jwt.verify(token , "secret" );
    

    if(decode){
        req.username = decode;
        next();
    } else {
        res.json({
            message : "Invalid Authorization"
        })
    }
}

module.exports = userMiddleware;