var mongoose = require('mongoose'),
    postSchema = new mongoose.Schema({
        postedByEmail: String,
        postedByName: String,
        updatedByEmail: String,
        updatedByName: String,
        content: String,
        postedOn: Date,
        updatedOn: String,
        category: String,
        shortDescription: String,
        myFile: String,
        comments: [{commentedByName: String,commentedByEmail: String, commentedOn: String, commentText:String, likes: Number, commentReplies: [{commentedByName: String,commentedByEmail: String, commentedOn: String, commentText:String, likes: Number}]}]
    });

    postSchema.statics.addPost = function (postDetails, callback) {
    this.create({
        postedBy: postDetails.postedBy,
        updatedBy: postDetails.updatedBy,
        content: postDetails.content,
        postedOn: Date.now(),
        updatedOn: Date.now(),
        category: postDetails.category,
        shortDescription: postDetails.shortDescription,
        myFile: postDetails.imageUrl
    }, function (err, data) {
        if (err) callback(err)
        else callback(data);
    });
}


postSchema.statics.getAllPosts = function(res, callback) {
  return this.find({
    
  }).exec(function(err, data) {
    if (err) callback(err)
    else callback(data);
  });
}

postSchema.statics.updatePost = function(postId, postDetails, callback) {
    this.findOneAndUpdate({
      "_id": postId
    }, {
      $set: {
        updatedBy: postDetails.updatedBy,
        content: postDetails.content,
        updatedOn: Date.now(),
        category: postDetails.category,
        shortDescription: postDetails.shortDescription,
        myFile: postDetails.imageUrl
      }
    }, {
      upsert: true
    })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  }

  module.exports = mongoose.model('Post', postSchema, 'Posts');

