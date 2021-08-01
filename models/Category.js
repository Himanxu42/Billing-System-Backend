const mongoose =require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    category_name: {
        type: String,
        require: true,
        trim : true 
    },
    category_id: {
        type: String,
        require:true
    }
   
});

module.exports = mongoose.model('Category', categorySchema); 