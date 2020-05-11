var router = require('express').Router();
var mongoose = require('mongoose');

var User = require('../models/user.js');

router.get('/',function(req,res,next){
  user ={
    _id : req.user._id,
    email : req.user.email
  }
  res.send(user);
});

router.get('/all',function(req,res,next){
  User.find({},{email : 1},function(err,data){
    res.send(data);
  })
})

router.post('/updateUser', function(req, res, next) {
  var newUserDetails = {};
  newUserDetails.firstName= req.body.firstName;
  newUserDetails.lastName= req.body.lastName;
  newUserDetails.email= req.body.email;
  User.updateUser(req.user._id, newUserDetails, function(err, data) {
    if (err)
      res.send("false");
    else {
      res.send(data);

    }
  })
});
router.get('/getUserDetails', function(req, res, next) {
  userDetails = {
    firstName : req.user.firstName,
    lastName : req.user.lastName,
    email : req.user.email,
    _id : req.user._id,
    photo: req.user.photo,
    github: req.user.github
  };
  res.send(userDetails);
});

router.get('/getUserId', function(req, res, next) {
  if (req.query.email) {
    User.getUserId(req.query.email, function(err, data) {
      if (err)
        res.send("false");
      else
        res.send(data);
    })
  }
  else {
    res.end();
  }
})

router.get('/getUsers', function(req, res, next){
  if(req.query.email){
    User.getUserEmail(req.query.email, function(err, data){
      if(!err){
        res.send(data);}
    })
  }
})


module.exports = router;
