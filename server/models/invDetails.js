const mongoose= require('mongoose')
const {Schema} =mongoose


const invDetailsSchema = new Schema({
    
    date:String,
    supplier:String,
    quantity:Number,
    price:Number,
    itemcode:String,
    
    
})

const InvDetailsModel = mongoose.model('InvDetails',invDetailsSchema);

module.exports = InvDetailsModel;