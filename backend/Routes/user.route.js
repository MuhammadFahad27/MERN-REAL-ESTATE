const express = require('express') ;
const { updateProfile, deleteAccount, getUserListing, deleteListing, updateList, getSingleList } = require('../Controllers/user.controller');
const { verify } = require('../Middlewares/verifyUser');
const { upload } = require('../Utils/multer');

const router = express.Router() ;

router.put('/update-profile/:id',verify,updateProfile)
router.delete('/delete-account/:id',verify,deleteAccount)
router.get('/listing/:id',verify,getUserListing)
router.delete('/delete-listing/:id/:listId',verify,deleteListing)
router.put('/update-listing/:id/:listId',verify,upload.single('image'),updateList)
router.get('/single-list/:listId',getSingleList)






module.exports = router 