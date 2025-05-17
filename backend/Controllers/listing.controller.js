const { handleError } = require("../Middlewares/error");
const Listing = require("../Models/listing.model");
const uploader = require('../Utils/upload');

const createListing = async (req, res, next) => {
    const { id } = req.params;
    const {
        
        address,
        description,
        type,
    } = req.body;

    const {name} = req.body

  console.log(address , description , type) 

    const bed = Number(req.body.bed); 
    const bath = Number(req.body.bath);
    const regularPrice = Number(req.body.regularPrice);
    const discount = Number(req.body.discount) || 0;

  

    

   
    const offer = req.body.offer === 'true';
    const parking = req.body.parking === 'true';
    const furnished = req.body.furnished === 'true';

    
  

    if (!req.file?.path) {
        return next(handleError(500, "Upload image"));
    }

    const url = await uploader.uploadFile(req.file.path);

    try {
        const listing = await Listing.create({
           
            name,
            address,
            description,
            type,
            parking,
            furnished,
            bedRooms:bed,
            bathRooms:bath,
            offer,
            regularPrice,
            discountPrice:discount,
            user: id,
            imageUrl: url.secure_url,
        });

        return res.status(201).json({
            success: true,
            message: 'Listing Created Successfully',
            listing,
        });
    } catch (error) {
        console.log(error);
        next(handleError(500, error.message ));
    }
};

const getListing = async (req,res,next)=>{

    
    try {

    // const limit = parseInt(req.query.limit) || 9
    const startIndex = parseInt(req.query.startIndex) || 0 ;
    let offer = req.query.offer ;
    
    if(offer == undefined || offer == 'false'){

        offer = {$in : [false,true]}
    }

    let parking = req.query.parking ;

    if(parking == undefined || parking == 'false'){

        parking = {$in:[true,false]}
    }
      let furnished = req.query.furnished;

    if(furnished == undefined || furnished == 'false'){

        furnished = {$in:[true,false]}
    }

    let type = req.query.type 

     if(type == undefined || type  == 'false' || type=='all'){

        type = {$in:['sale','rent']}
    }

    const searchTerm = req.query.searchTerm || '' ;

    const sort = req.query.sort || 'createdAt' 
    
  
    const order = req.query.order === 'asc' ? 1 : -1;

    console.log('order :',order)
    console.log('sort :',sort)

    

    const listing = await Listing.find({

        name:{ $regex:searchTerm  , $options:'i'} ,
        offer ,
        parking , 
        furnished ,
        type ,

    }).sort({[sort]:order})
    return res.status(200).json({

        success:true ,
        message:'Searching Results',
        listing
    })



        
} 
    catch (error) {
        console.log(error)
        next(handleError(500,error))
    }

}

module.exports = { createListing , getListing};
