const mongoose = require('mongoose')
const {Schema} = mongoose

const EmployeesalaryScheme = new Schema({
    name: String,
    email: String,
    idNumber: String,
    phoneNumber: String,
    team: String,
    daySalary: String,
    wDays: String,
    lDays: String,
    calculatedSalary:String
})

const EmployeeSalaryModel = mongoose.model("Salaries", EmployeesalaryScheme)
module.exports = EmployeeSalaryModel

