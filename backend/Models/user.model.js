const mongoose = require('mongoose') ;

const userScheema = new mongoose.Schema({

    username:{

        type:String ,
        unique:true ,
        required:true
    },
    email:{

        type:String ,
        unique:true ,
        required:true
    },
    password:{

        type:String ,
        required:true
    }


},{timestamps:true})

const User = mongoose.model('User',userScheema) ;

module.exports = User 