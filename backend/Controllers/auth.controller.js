const { handleError } = require("../Middlewares/error");
const User = require("../Models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async (req,res,next)=>{

    const {username , email , password ,confirmPassword } = req.body ;

    if(!username){

        return next(handleError(400,'Username is required '))
    }
     if(!email){

        return next(handleError(400,'Email is required '))
    } if(!password){

        return next(handleError(400,'Password is required '))
    }
     if(!confirmPassword){

        return next(handleError(400,'Confirm Password is required '))
    }

    if(password.length > 15 ){

        return next(handleError(400,'Password should be less then 15 characters '))
    }
     if(password.length < 5 ){

        return next(handleError(400,'Password should be greater  then 5 characters '))
    }

    if(password !== confirmPassword){

        return next(handleError(400,'Password should be same '))

    }

    const hashedPassword = await bcrypt.hash(password,10) ;

    try {

        const user = await User.create({

            username ,
            email ,
            password : hashedPassword
        })

        return res.status(201).json({

            success:true ,
            message:'sign up successfully',
            username ,
            email 
        })
        
    } catch (error) {
        
        next(handleError(500,'Server Error'))
    }


}

const signIn = async (req,res,next)=>{

    const {email,password} = req.body ;

    if(!email){

        return next(handleError(400,'Email is required '))
    }
      if(!password){

        return next(handleError(400,'Password  is required '))
    }

    try {

        const verifyUser = await User.findOne({email}) ;

        if(!verifyUser){

            return next(handleError(404,'User not found '))
        }

        const verifyPassword = await bcrypt.compare(password,verifyUser.password) ;

        if(!verifyPassword){

            return next(handleError(400,'Invalid Crendentials')) ;
        }

        const token = jwt.sign({id:verifyUser._id},process.env.JWT_SECRET)

      const { password : userPassword , ...user } = verifyUser._doc; // separate the password before sending


        res.cookie('access_token',token,{

            httpOnly:true,
            secure:process.env.NODE_ENV == "production",
            sameSite:process.env.NODE_ENV == "production" ? 'none':'strict' ,
            path:'/'

        })
        .status(200).json({success:true ,
         message:'successfully sign-in',
         user })

       



        
    } catch (error) {
        console.log(error)
        next(handleError(500,'Server Error'))
    }

}

const signOut = (req,res,next)=>{

    try {

          return res.clearCookie('access_token').status(200).json({

        success:true ,
        message:'logout successfully'
    })
        
    } catch (error) {
        
        next(handleError(500,'Server Error'))
    }

  
}

const checkAuth = (req,res,next)=>{

    try {

          const token = req.cookies.access_token ;
    
        if(!token){
    
            return res.json({
                success:false ,
                isAuthenticated: false
            })
        }

      
        
    } catch (error) {
        next(handleError(500,'Server Error'))
    }

    
    
}

module.exports = {signUp , signIn , signOut , checkAuth}