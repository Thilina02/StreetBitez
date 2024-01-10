const mongoose = require('mongoose')
const {Schema} = mongoose


const stallSchema = new Schema({
      sName: String,
      type:String,
      fName: String,
      lName: String,
      email: String,
      phone: Number,
      
     
})

const StallModel = mongoose.model('Stall', stallSchema)
module.exports = StallModel;