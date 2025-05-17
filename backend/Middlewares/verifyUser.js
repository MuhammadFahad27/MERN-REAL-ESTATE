const { handleError } = require("./error");
const jwt = require('jsonwebtoken')

const verify = async(req,res,next)=>{

    const token = req.cookies.access_token ;

    if(!token){

        return next(handleError(401,'Login first'))
    }

    try {

        const decode  = await jwt.verify(token,process.env.JWT_SECRET) ;

        req.user = decode 

        next() ;
        
    } catch (error) {

        next(handleError(403,'Forbidden '))
        
    }

}

module.exports = {verify}