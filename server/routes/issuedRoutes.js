const express =require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const{issueEntry,getIssuedDetails}=require('../controllers/issuedController')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

router.post('/',issueEntry);
 router.get('/getIssuedDetails:stoleid',getIssuedDetails);
/*router.get('/getItem:itemId',getItem);
router.post('/updateItem/:itemId', updateItem);
router.delete('/deleteItem/:itemId', deleteItem);
router.get('/getItembyItemcode:itemcode',getItembyItemcode); */




module.exports=router


