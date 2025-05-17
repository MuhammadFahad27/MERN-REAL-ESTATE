const express = require('express') ;
const { createListing, getListing } = require('../Controllers/listing.controller');
const { verify } = require('../Middlewares/verifyUser');
const { upload } = require('../Utils/multer');

const router = express.Router() ;

router.post('/create-listing/:id',verify,upload.single('image'),createListing)
router.get('/get',getListing)

module.exports = router 