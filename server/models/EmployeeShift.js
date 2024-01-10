const mongoose = require('mongoose')
const {Schema} = mongoose

const EmployeeshiftScheme = new Schema({
    team:String,
    date:String,
    time:String,
    venue:String,
    task:String,
    
    done:{
        type:Boolean,
        default:false
    }
})

const EmployeeShiftModel = mongoose.model("Shifts", EmployeeshiftScheme)
module.exports = EmployeeShiftModel