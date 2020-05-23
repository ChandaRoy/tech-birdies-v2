var mongoose = require('mongoose'),
    topicSchema = new mongoose.Schema({
        postedByEmail: String,
        postedByName: String,
        postedOn: String,
        updatedOn: String,
        title: String,
        description: String,
        category: String,
        subcategory: String,
        likes: Number,
        liked_by: [String],
        comments: [{commentedByName: String,commentedByEmail: String, commentedOn: String, commentText:String, likes: Number}]
    });

    topicSchema.statics.addTopic = function (topicDetails, callback) {
    this.create({
        postedByEmail: topicDetails.postedByEmail,
        postedByName: topicDetails.postedByName,
        updatedBy: topicDetails.updatedBy,
        content: topicDetails.content,
        postedOn: Date.now(),
        updatedOn: Date.now(),
        title: topicDetails.title,
        description: topicDetails.description,
        category: topicDetails.category,
        subcategory: topicDetails.subcategory
    }, function (err, data) {
        if (err) callback(err)
        else callback(data);
    });
}


topicSchema.statics.getAllTopics = function(res, callback) {
  return this.find({
    
  }).exec(function(err, data) {
    if (err) callback(err)
    else callback(data);
  });
}

topicSchema.statics.addComment = function(topicId, commentDetails, callback) {
    this.findOneAndUpdate({
      "_id": topicId
    }, 
    { $push: { comments: commentDetails  } }
    )
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  }

  module.exports = mongoose.model('Topics', topicSchema, 'Topics');

