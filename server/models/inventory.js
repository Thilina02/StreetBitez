const mongoose= require('mongoose')
const {Schema} =mongoose

const category={
    food:'food',
    furniture:'furniture',
    machinery:'machinery'
};

const inventorySchema = new Schema({
    
    name:String,
    description:String,
    quantity:Number,
    reorder:Number,
    itemcode:{
        type:String,
        unique:true
    },
    category: String
   
})

const InventoryModel = mongoose.model('Inventory',inventorySchema);

module.exports = InventoryModel;