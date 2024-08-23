const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var certificateSchema = new mongoose.Schema({
    certificateName:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    url:{
        type: String,
        required:true,
    },
    skills:[{
        type:String,
    }],
    verify:{
        type: String,
        required:true,
    },
    company:{
        type: String,
        required:true,
    },
});

let certificateModel = mongoose.model('certifications',certificateSchema);

module.exports = {
    certificateModel,
}