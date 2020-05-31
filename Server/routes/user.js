let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();
var path = require('path');

var User = require('../models/user.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, 'uploads/dps');
  },
  filename: (req, file, cb) => {
    console.log(req.body);
    let email = req.body.email;
    const fileName = email+'.'+ file.originalname.split('.')[1];

    console.log(fileName);
    cb(null, fileName)
  }
});

var upload = multer({storage: storage}).single('myFile');

router.post('/updateUser', function (req, res) {
  upload(req, res, function (err) {
    console.log(req.body);
    var newUserDetails = {
      "firstName" : req.body.firstName,
      "lastName" : req.body.lastName,
      "company" : req.body.company,
      "aboutMe" : req.body.aboutMe
    }
    if (err) {
      console.log("I am in error");
      console.log(err);
      // An error occurred when uploading 
      return
    }
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      
      newUserDetails.photo = url + '/dps/' + req.file.filename;
      console.log(newUserDetails.photo);
    } 
    User.findOneAndUpdate({ 
      "email": req.body.email
    },
     { $set: newUserDetails }
     ).then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).json({
          message: "error"
        });
      }
    });
  })
});

router.get("/details", (req, res, next) => {
  console.log(req.user);
  console.log(req.params);
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  });
});

router.get('/getUserDetails', function(req, res, next) {
  userDetails = {
    firstName : req.user.firstName,
    lastName : req.user.lastName,
    email : req.user.email,
    _id : req.user._id,
    photo: req.user.photo,
    company: req.user.company,
    aboutMe: req.user.aboutMe
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

router.get('/all',function(req,res,next){
  User.find({},{email : 1},function(err,data){
    res.send(data);
  })
})

router.get('/',function(req,res,next){
  user ={
    _id : req.user._id,
    email : req.user.email
  }
  res.send(user);
});


module.exports = router;
