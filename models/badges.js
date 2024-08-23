const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var badgeSchema = new mongoose.Schema({
    badgeName:{
        type:String,
        required:true,
        unique:true,
    },
    badgeDescription:{
        type:String,
        required:true,
    },
    badgeUrl:{
        type:String,
        required:true,
    },
    skills:[{
        type:String,
}],
    verify:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    }
});

let badgeModel = mongoose.model('badges',badgeSchema);

module.exports = {
    badgeModel,
}