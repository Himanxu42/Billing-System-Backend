const mongoose =require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    product_name: {
        type: String,
        require: true,
        trim : true 
    }
    , stock: {
        type: Number,
        require: true,
        trim : true 
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    mrp: {
        type: Number,
        require: true,
        trim : true 
    },
    discount: {
        type: Number,
        trim: true,
        default: 0 
    },
    discounted_mrp: {
        type: Number,
        trim: true,
        default: 0
    },
    product_id: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Product', productSchema); 