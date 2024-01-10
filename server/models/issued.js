const mongoose= require('mongoose')
const {Schema} =mongoose


const issuedDetailsSchema = new Schema({
    
    date:String,
    price:Number,
    quantity:Number,
    itemName:String,
    itemCode:String,
    stoleid:String,
    
    
})

const IssuedDetailsModel = mongoose.model('IssuedDetails',issuedDetailsSchema);

module.exports = IssuedDetailsModel;