const mongoose = require('mongoose');
const {db_password} = require('./config.json');


const makeConnection  = async (db_name) => {
    return await mongoose.connect(`mongodb+srv://marvelavengersharsha:${db_password}@cluster0.xv2jk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${db_name}`);
}

module.exports = {
    makeConnection,
}