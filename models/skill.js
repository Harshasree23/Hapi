const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var skillSchema = new mongoose.Schema({
    skillName:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    learnedFrom:[{
        type: String,
    }],
    projects:[{
        type:String,
    }],
    certificates:[{
        type:String,
    }],
});

let skillModel = mongoose.model('skills',skillSchema);

module.exports = {
    skillModel,
}