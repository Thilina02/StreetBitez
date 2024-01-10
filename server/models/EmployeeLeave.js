const mongoose = require('mongoose')
const {Schema} = mongoose

const EmployeeleaveScheme = new Schema({
    name: String,
    email: String,
    type: String,
    reason: String,
    time:String,
    startDate: String, 
    endDate: String,   
    leaveDays: String,
    done:{
        type:Boolean,
        default:false
    }
})

const EmployeeLeaveModel = mongoose.model("Leaves", EmployeeleaveScheme)
module.exports = EmployeeLeaveModel