const mongoose =require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    category_name: {
        type: String,
        require: true,
        trim : true 
    }
   
});

module.exports = mongoose.model('Category', categorySchema); 