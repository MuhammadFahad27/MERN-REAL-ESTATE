const { handleError } = require("../Middlewares/error")
const bcrypt = require('bcryptjs');
const User = require("../Models/user.model");
const Listing = require("../Models/listing.model");
const uploader = require('../Utils/upload');


const updateProfile = async (req,res,next)=>{

    if(req.user.id !== req.params.id){

        return next(handleError(403,'unOtherized '))
    }

    try {

        const {username , password , email } = req.body ;
        const data = {} ;

        if(username) data.username = username  
        if(email) data.email = email  
        if(password){

            const hashedPassword = await bcrypt.hash(password,10) ;
            data.password = hashedPassword
        }
        

        const updateUser = await User.findByIdAndUpdate(req.params.id,data,{new:true})

        const {password:userPassword , ...user} = updateUser._doc

        return res.status(200).json({
            success:true ,
            message:'Updated successfully ',
            user 
        }
        )
        
    } catch (error) {
        
        next(handleError(500,'Server Error'))
    }

}

const deleteAccount = async (req,res,next)=>{

    if(req.user.id !== req.params.id){

        return next(handleError(403,'you can not take this action '))
    }

    try {

        const deleteUser = await User.findByIdAndDelete(req.params.id) ;

        res.clearCookie('access_token');
        return res.status(200).json({

            success:true ,
            message:'Account Deleted Successfully '
        })
        
    } catch (error) {
        
        next(handleError(500,'Server Error'))
    }

}

const getUserListing = async (req,res,next)=>{

    const {id} = req.params ;

    if(id !== req.user.id){

        return next(handleError(403,'You can not see listing of an other user '))
    }
    try {

        const listing = await Listing.find().populate('user','username email').sort({createdAt:-1})

        return res.status(200).json({

            success:true ,
            message :"Listing ",
            listing 
        })
        
    } catch (error) {
        console.log(error)
        next(handleError(500,'Server Error '))
    }
}

const deleteListing = async (req,res,next)=>{

    if(req.user.id !== req.params.id){

        return next(handleError(403,'You are not allowed to delete ')) ;
    }

    const {listId} = req.params ;

    if(!listId){

        return next(handleError(400,'Select Property List to delete ')) ;
    }

    try {

        const deleteList = await Listing.findByIdAndDelete(listId) ;

        if(!deleteList){

            return next(handleError(404,'List not found '))
        }

        return res.status(200).json({

            success:true ,
            message :"Deleted "
        })


        
    } catch (error) {
        next(handleError(500,'Server '))
    }
}

const updateList = async (req,res,next)=>{

    if(req.user.id !== req.params.id){

        return next(handleError(403,'Unotherized'))
    }

    const {listId} = req.params

    if(!listId){

        return next(handleError(400,'Select Lsit to update ')) ;
    }

    const {
        
        address,
        description,
        type,
    } = req.body;
    const {name} = req.body
    const bed = Number(req.body.bed); 
    const bath = Number(req.body.bath);
    const regularPrice = Number(req.body.regularPrice);
    const discount = Number(req.body.discount);
    const offer = req.body.offer === 'true';
    const parking = req.body.parking === 'true';
    const furnished = req.body.furnished === 'true';
    let url 
    if (req.file?.path) {
        
        url = await uploader.uploadFile(req.file.path);
    }

    const prev = await Listing.findById(listId) ;
    
    if(!prev){
        
        return next(handleError(404,'List not found'))
    }
    
    
    
    try {
        console.log('address',address)
        const updatedList = await Listing.findByIdAndUpdate(listId,{
           
            name: name || prev.name,
            address:address || prev.address,
            description : description || prev.description,
            type:type || prev.type,
            parking:parking || prev.parking,
            furnished:furnished || prev.furnished,
            bedRooms:bed || prev.bedRooms,
            bathRooms:bath || prev.bathRooms,
            offer:offer || prev.offer,
            regularPrice:regularPrice || prev.regularPrice,
            discountPrice:discount || prev.discountPrice,
            user: req.params.id || prev.id,
            imageUrl: url?.secure_url || prev.imageUrl ,
        },{new:true});

        return res.status(201).json({
            success: true,
            message: 'List Updated  ',
           
        });
    } catch (error) {
        console.log(error);
        next(handleError(500, 'Server Error ' ));
    }

}

const getSingleList = async (req,res,next)=>{

  const {listId} = req.params ;

    if(!listId){

        return next(handleError(400,'Id is missing '))
    }

    try {

        const singleList = await Listing.findById(listId).populate('user','username email') ;

        return res.status(200).json({

            success:true ,
            message :"current list ",
            singleList
        })
        
    } catch (error) {
        next(handleError(500,'Internal Server Error'))
    }
}

module.exports = {updateProfile,deleteAccount , getUserListing ,deleteListing , updateList ,
    getSingleList
}