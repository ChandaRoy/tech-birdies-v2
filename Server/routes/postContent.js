let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();
let Post = require('../models/post');

var path = require('path');
// Multer File upload settings
const DIR = '/public/videos';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, 'uploads/files');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// GET All Post
router.get("/all", (req, res, next) => {
  Post.find().then(data => {
    res.status(200).json({
      message: "Posts retrieved successfully!",
      posts: data
    });
  });
});

router.get('/all', function (req, res, next) {
  Post.find({}, {}, function (err, data) {
    console.log(data);
    res.send(data);
  })
})



var upload = multer({storage: storage}).single('myFile')

router.post('/addPost', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log("I am in error");
      console.log(err);
      // An error occurred when uploading 
      return
    }
    if(req.file) {
    const url = req.protocol + '://' + req.get('host');
    console.log("url");
    console.log(req.protocol);
    console.log(req.get('host'));
    console.log(url);
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      category: req.body.category,
      myFile: url + '/files/' + req.file.filename
    });
    post.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post added successfully!",
        postCreated: {
          _id: result._id,
          category: result.category,
          // postedByName: req.user.firstName+req.user.lastName,
          myFile: result.file
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  } else res.status(500).json({
    error: err
  });
  })
});

// GET All Post
router.get("/", (req, res, next) => {
  Post.find().then(data => {
    res.status(200).json({
      message: "Posts retrieved successfully!",
      posts: data
    });
  });
});


// GET Post
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(data => {
    if (data) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  });
});


module.exports = router;