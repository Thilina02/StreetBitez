const mongoose = require('mongoose')
const {Schema} = mongoose

const EmployeecontactScheme = new Schema({
    email:String,
    description:String
})

const EmployeeContactModel = mongoose.model("Contacts", EmployeecontactScheme)
module.exports = EmployeeContactModel