const express =require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const{addStock,getAllItemDetails,getAllinv}=require('../controllers/invDetailsController')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

router.post('/',addStock);
router.get('/getItem:itemcode',getAllItemDetails);
router.get('/getAllinv',getAllinv);


module.exports=router