const Expense =require('../models/expenses');


const test=(req,res) =>{
    res.json('test is working')
}

const addNewexpenses = async (req, res) => {
    const { inputExpensesone, inputExpensesAmount, inputExpensesTwo , inputExpensesAmountTwo,} = req.body;
  
    try {
      const Outcome = await Expense.create({
        inputExpensesone,
        inputExpensesAmount,
        inputExpensesTwo,
        inputExpensesAmountTwo,
      });
  
      res.json(Outcome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add new input' });
    }
  };
  const getAllExpenseDetails = async (req, res) => {
    try {
      const ExpenseDetails = await Expense.find();
  
      res.json(ExpenseDetails); // Return the income details as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving income details' });
    }
  };
  const deleteExpensesById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Use Mongoose to delete the income by ID
      const deletedExpense = await Expense.findByIdAndDelete(id);
  
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.sendStatus(204); // Send a successful response with status code 204 (No Content) for successful deletion.
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateExpensesById = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const { inputExpensesone, inputExpensesAmount, inputExpensesTwo,inputExpensesAmountTwo } = req.body; // Get the updated data from the request body
  
      // Use Mongoose to find the income by ID and update it
      const updateExpenses = await Expense.findByIdAndUpdate(
        id,
        {
          inputExpensesone,
          inputExpensesAmount,
          inputExpensesTwo,
          inputExpensesAmountTwo,
        },
        { new: true } // To return the updated document
      );
  
      if (!updateExpenses) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.json(updateExpenses); // Return the updated income details as JSON response
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  module.exports={
    addNewexpenses,
    getAllExpenseDetails,
    deleteExpensesById,
    updateExpensesById,

  }