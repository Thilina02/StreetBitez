const mongoose = require('mongoose')
const {Schema} = mongoose

const EmployeenewsScheme = new Schema({
  
    description:String
})

const EmployeeNewsModel = mongoose.model("News", EmployeenewsScheme)
module.exports = EmployeeNewsModel