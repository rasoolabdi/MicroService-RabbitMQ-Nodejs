const jwt = require("jsonwebtoken");
async function isAuthenticated(req,res,next) {
    try {
        const token = req.headers?.["Authentication"]?.split(" ")[1];
        jwt.verify(token , "secretKey" , (error , payload) => {
            if(error) return res.json({error: error});
            req.user = payload;
            console.log("payload" , payload);
            next();
        })
    }
    catch(error) {
        return res.json({error: error.message});
    }
}

module.exports = {
    isAuthenticated
}