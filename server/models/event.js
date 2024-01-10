const mongoose= require('mongoose');
const {Schema} =mongoose;

const eventSchema = new Schema({
    name: String,
   
    phonenumber: Number,
    email: {
      type: String,
      unique: true
    },
    Ename:String,
    
    Etime:String,
    date:String,
    Npeople:Number,
    theme:String,
    Fneed:String,
    

  })
  const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
  