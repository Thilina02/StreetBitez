const mongoose= require('mongoose')
const {Schema} =mongoose

const feedbackSchema = new Schema({
  userName: String,  
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model, assuming you have a User schema
      required: true,
    },
    rating: {
      type: Number, // Add a field to store the star rating
      required: true,
      min: 1,       // Define minimum and maximum values for the rating
      max: 5,
    },

    feedbackText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false, // Initially, feedback is not read
    },
    
  });

  const FeedbackModel = mongoose.model('Feedback', feedbackSchema);
  module.exports = FeedbackModel;