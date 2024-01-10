const express =require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');


const { addNew, getAllIncomeDetails,deleteIncomeById ,updateIncomeById} = require('../controllers/IncomeExpenses');



//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

router.post('/Input',addNew)
router.get('/getIncome',getAllIncomeDetails)
router.delete('/deleteIncome/:id',deleteIncomeById)
router.put('/updateIncome/:id',updateIncomeById)
module.exports=router