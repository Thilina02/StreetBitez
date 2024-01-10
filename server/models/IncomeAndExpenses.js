const mongoose = require('mongoose');
const { Schema } = mongoose;

const Income = new Schema({
  inputTypeOne: String,
  inputTypeTwo: Number, // Changed the type to Number
  inputTypeThree: String,
  inputTypeFour: Number, // Changed the type to Number
});

const IncomeExpensesModel = mongoose.model('Income', Income);
module.exports = IncomeExpensesModel;
