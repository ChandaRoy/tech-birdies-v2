let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();
let Post = require('../models/post');
let Topic =require('../models/topics');

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

router.get('/allTopics', function (req, res, next) {
  Topic.find({}, {}, function (err, data) {
    res.send(data);
  })
})

router.get('/my-topic-threads', function (req, res, next) {
  Topic.find({
    postedByEmail: req.user.email
  }, {}, function (err, data) {
    if(!err)
    res.send(data);
  })
})

router.get('/my-post-threads', function (req, res, next) {
  Post.find({
    postedByEmail: req.user.email
  }, {}, function (err, data) {
    if(!err)
    res.send(data);
  })
})

router.get('/like', function (req, res, next) {
    Topic.findOneAndUpdate({ 
      "_id": req.body.topicId
    },
     { $push: { comments: commentDetails } }
     ).then(data => {
      if (data) {
        console.log(data);
        res.send(data);
      } else {
        res.status(404).json({
          message: "Topic not found!"
        });
      }
    });
})

router.get('/topic-groups', function (req, res, next) {
  Topic.aggregate(
     [
        { $group : {
           _id : "$category",
           count: { $sum: 1 }
           } }
       ] 
     ).then(data => {
    if (data) {
      console.log(data);
      res.send(data);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  });
})

router.get('/post-groups', function (req, res, next) {
  Post.aggregate(
     [
        { $group : {
           _id : "$category",
           count: { $sum: 1 }
           } }
       ] 
     ).then(data => {
    if (data) {
      console.log(data);
      res.send(data);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  });
})

// GET by id
router.get("/post/:id", (req, res, next) => {
  console.log(req.params);
  var mysort = {"comments.postedOn" : -1};
  Post.findById(req.params.id)
  .populate('postedBy','firstName lastName photo company aboutMe email')
  .populate('comments.commentedBy', 'firstName lastName photo company aboutMe email')
  .populate('comments.commentReplies.commentedBy', 'firstName lastName photo company aboutMe email')
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  });
});

router.get("/topic/:id", (req, res, next) => {
  console.log(req.params);
  Topic.findById(req.params.id)
  .populate('postedBy','firstName lastName photo company aboutMe email')
  .populate('comments.commentedBy', 'firstName lastName photo company aboutMe email')
  .populate('comments.commentReplies.commentedBy', 'firstName lastName photo company aboutMe email')
  .then(data => {
    if (data) {
      // console.log(data);
      res.send(data);
    } else {
      res.status(404).json({
        message: "Topic not found!"
      });
    }
  });
});


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

    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      category: req.body.category,
      shortDescription: req.body.shortDescription,
      postedBy: req.user.id,
      postedOn: Date.now(),
      updatedOn: Date.now(),
      myFile: url + '/files/' + req.file.filename
    });
    post.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post added successfully!",
        postCreated: {
          _id: result._id,
          category: result.category,
          myFile: result.file
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  } else {
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      category: req.body.category,
      shortDescription: req.body.shortDescription,
      postedBy: req.user.id,
      postedOn: Date.now(),
      updatedOn: Date.now()
    });
    post.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post added successfully!",
        postCreated: {
          _id: result._id,
          category: result.category
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    });
  }
  })
});

router.post('/addTopic', function (req, res) {

    const topic = new Topic({
      postedBy: req.user.id,
      updatedBy: req.body.updatedBy,
      content: req.body.content,
      postedOn: Date.now(),
      updatedOn: Date.now(),
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      subcategory: req.body.subcategory
    });
    topic.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Topic added successfully!",
        postCreated: result
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
});

router.post('/topicComment',function(req,res){
var commentDetails = {
  "commentText" : req.body.commentText,
  "commentedBy" : req.user.id,
  "commentedOn": new Date()
};
console.log(commentDetails);
  Topic.findOneAndUpdate({ 
    "_id": req.body.id
  },
   { $push: { comments: commentDetails } }
   ).then(data => {
    if (data) {
      console.log(data);
      res.send(data);
    } else {
      res.status(404).json({
        message: "Topic not found!"
      });
    }
  });
})

router.post('/postComment',function(req,res){
  var commentDetails = {
    "commentText" : req.body.commentText,
    "commentedBy" : req.user.id,
    "commentedOn": new Date()
  };
  console.log(commentDetails);
    Post.findOneAndUpdate({ 
      "_id": req.body.id
    },
     { $push: { comments: commentDetails } }
     ).then(data => {
      if (data) {
        console.log(data);
        res.send(data);
      } else {
        res.status(404).json({
          message: "Post not found!"
        });
      }
    });
  })

router.post('/postCommentReply',function(req,res){
    var commentDetails = {
      "commentText" : req.body.commentText,
      "commentedBy" : req.user.id,
      "commentedOn": new Date()
    };
    console.log(commentDetails);
      Post.findOneAndUpdate({ 
        "_id": req.body.postId,
        "comments._id": req.body.commentId
      },
       { $push: { "comments.$.commentReplies": commentDetails } }
       ).then(data => {
        if (data) {
          console.log(data);
          res.send(data);
        } else {
          res.status(404).json({
            message: "Post not found!"
          });
        }
      });
  })

  router.post('/topicCommentReply',function(req,res){
    var commentDetails = {
      "commentText" : req.body.commentText,
      "commentedBy" : req.user.id,
      "commentedOn": new Date()
    };
    console.log(commentDetails);
      Topic.findOneAndUpdate({ 
        "_id": req.body.topicId,
        "comments._id": req.body.commentId
      },
       { $push: { "comments.$.commentReplies": commentDetails } }
       ).then(data => {
        if (data) {
          console.log(data);
          res.send(data);
        } else {
          res.status(404).json({
            message: "Post not found!"
          });
        }
      });
  })

// GET All Post
router.get("/", (req, res, next) => {
  Post.find().then(data => {
    res.status(200).json({
      message: "Posts retrieved successfully!",
      posts: data
    });
  });
});





module.exports = router;