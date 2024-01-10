const express =require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const{addNew,getAllItems,getItem,updateItem,deleteItem,getItembyItemcode, getItemsbyCatogery,deleteInvById}=require('../controllers/invController')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

router.post('/',addNew);
router.get('/getallItems',getAllItems);
router.get('/getItem:itemId',getItem);
router.post('/updateItem/:itemId', updateItem);
router.delete('/deleteItem/:itemId', deleteItem);
router.get('/getItembyItemcode:itemcode',getItembyItemcode);
router.get('/fetchItemsbyCatogery:category',getItemsbyCatogery);

router.delete('/deleteInv/:id', deleteInvById);




module.exports=router