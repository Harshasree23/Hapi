const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    usedTechnologies:[{
        type:String,
    }],
    link:{
        type:String,
        required:true,
    },
    git:{
        type:String,
        required:true,
    },
    video:{
        type:String,
    },
});

let projectModel = mongoose.model('projects',projectSchema);

module.exports = {
    projectModel,
}