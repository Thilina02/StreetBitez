const mongoose= require('mongoose')
const {Schema} =mongoose

const supportSchema = new Schema({
  userName: String,  
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    email: {
      type:String, 
      required: true,
    },
    supportText: {
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

  const SupportModel = mongoose.model('Support', supportSchema);
  module.exports = SupportModel;