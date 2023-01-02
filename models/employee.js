const mongoose = require('mongoose'); 

const schema = mongoose.Schema(
    {
    name:String,
    location:String,
    position:String,
    salary:String
    },
    { versionKey: false })

const database = mongoose.model('employee',schema)
module.exports = database