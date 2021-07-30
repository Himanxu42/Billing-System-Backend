const mongoose =require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    store_name: {
        type: String,
        require: true,
        trim : true 
    }
    , email: {
        type: String,
        require: true,
        trim : true 
    },
    password: {
        type: String,
        require: true,
        trim : true 
    }
});

module.exports = mongoose.model('User', userSchema); 