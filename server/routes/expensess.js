const express =require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const{addNewexpenses,getAllExpenseDetails,deleteExpensesById,updateExpensesById}=require('../controllers/expensesContoller')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

router.post('/addexpenses', addNewexpenses);
router.get('/getExpenses',getAllExpenseDetails)
router.delete('/deleteExpense/:id',deleteExpensesById)
router.put('/updateExpense/:id',updateExpensesById)

module.exports=router