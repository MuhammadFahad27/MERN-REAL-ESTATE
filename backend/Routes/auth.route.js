const express = require('express') ;
const { signUp, signIn, signOut, checkAuth } = require('../Controllers/auth.controller');
const router = express.Router() ;

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.get('/sign-out',signOut)
router.get('/check',checkAuth)



module.exports = router 