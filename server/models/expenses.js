const mongoose = require('mongoose');
const { Schema } = mongoose;

const Expense = new Schema({
  inputExpensesone: String,
  inputExpensesAmount: Number, // Changed the type to Number
  inputExpensesTwo: String,
  inputExpensesAmountTwo: Number, // Changed the type to Number
});

const ExpensesModel = mongoose.model('Expense', Expense);
module.exports = ExpensesModel;
