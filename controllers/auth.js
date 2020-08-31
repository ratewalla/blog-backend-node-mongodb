const User = require('../models/user');
const shortId = require('shortid');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

// user sign up
exports.signup = (req, res) => {

    // check if user exists
   User.findOne({email: req.body.email}).exec((err, user)=>{
       if(user){
           return res.status(400).json({error: 'Email is taken.'})
       }
   });

    // create new user   
   const {name, email, password} = req.body;
   const username = shortId.generate();
   const profile = `${process.env.CLIENT_URL}/profile/${username}`;

   const newUser = new User({
       name, email, password, profile, username
   });

   newUser.save((err, success)=>{
       if(err){
           return res.status(400).json({error: err})
       }
        res.json({message: 'Signup successfull. You can now sign in.'});
        // res.json({user: success});

   })

};

// user sign in
exports.signin = (req, res) => {

    const {email, password} = req.body;

    // check if user exists
    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({error: 'User with that email does not exist.'});
        };
    

        // authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password dont match!'
            });
        }

        // generate token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', token, {expiresIn: '1d'});
        const {_id, username, name, email, role} = user;
        
        return res.json({
            token,
            user: {_id, username, name, email, role}
        });
    });
};


// sign out
exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Sign out Success'
    });
};


// require login to view (need to set algorithms)
exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});



// Middlewares
// checks for user
exports.authMiddleware = (req,res,next) => {
    const authUserId = req.user._id;
    User.findById({_id:authUserId}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User not found!'
            });
        }

        req.profile = user;
        next();
    })
};

// checks if user is admin
exports.adminMiddleware = (req,res,next) => {
    const adminUserId = req.user._id;
    User.findById({_id:adminUserId}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User not found!'
            });
        }
        if(user.role !== 'admin'){
            return res.status(400).json({
                error: 'Admin only! Access denied.'
            });
        }
        req.profile = user;
        next();
    })
};