const mongoose = require('mongoose') ;

const listingScheema = new mongoose.Schema({

    name:{

        type:String ,
        required:true,
        default:'hello'

    },
    
    description:{

        type:String ,
        required:true,

    },
    
    address:{

        type:String ,
        required:true,

    },
    
    regularPrice:{

        type:Number ,
        required:true,

    },
    
    discountPrice:{

        type:Number ,
        required:true,
        default:0

    },
    bathRooms:{

        type:Number ,
        required:true,
        default:1

    },
    bedRooms:{

        type:Number ,
        required:true,
        default:1

    },
    furnished:{

        type:Boolean ,
        required:true,
        default:false

    },
    parking:{

        type:Boolean ,
        required:true,
        default:false

    },
    type:{

        type:String,
        required:true ,
        default: 'sale',
        enum:['rent','sale']
    },
    offer:{

        type:Boolean,
        required:true,
        default:false
    },
    imageUrl:{

        type:String,
        required:true
    },
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      
    }

},{timestamps:true})

const Listing = mongoose.model('Listing',listingScheema) ;

module.exports = Listing 