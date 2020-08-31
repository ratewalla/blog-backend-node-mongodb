const express = require('express');
const router = express.Router();
const {signup,signin,signout, requireSignin} = require('../controllers/auth');


// validators
const {runValidation} = require('../validators')
const {userSignupValidator} = require('../validators/auth')
const {userSignInValidator} = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSignInValidator, runValidation, signin);
router.get('/signout', signout);

// test authenticated page
// router.get('/secret', requireSignin,(req,res)=>{
//     res.json({
//         user: req.user
//     })
// })


module.exports = router;