const jwt = require("jsonwebtoken");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    //Check readme for the exact headers to be expected 
    const authorization = req.headers.authorization;
    const words = authorization.split(" ");
    const token = words[1];
    console.log(token)
    const decode = jwt.verify(token ,"123");
console.log(decode)
    if(decode){
        next();
    } else {
        res.json({
            message : "Invalid Authorization"
        })
    }

}

module.exports = adminMiddleware;