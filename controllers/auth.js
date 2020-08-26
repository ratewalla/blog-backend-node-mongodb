const User = require('../models/user');
const shortId = require('shortid');

exports.signup = (req, res) => {
   User.findOne({email: req.body.email}).exec((err, user)=>{
       if(user){
           return res.status(400).json({error: 'Email is taken.'})
       }
   })

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
    //    res.json({message: 'Signup successfull. You can now sign in.'});
       res.json({user: success});

   })

};