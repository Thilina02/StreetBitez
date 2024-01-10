const mongoose = require('mongoose')

const Schema  =  mongoose.Schema

const driverSchema = new Schema({
    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true

    },

    mobile : {
        type : Number,
        required : true,
        unique : true,
    },

    nic : {
        type : Number,
        required : true,
        unique : true
    },

    province : {
        type : String,
        required : true
    },

    gender : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true,
        unique : true
    },


})


module.exports = mongoose.model('Driver', driverSchema)  