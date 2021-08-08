const mongoose =require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    order_user_id: {
        type: String,
        require:true
    },
    orders: {
        type: [],
        default : []
    },
    total: {
        type: Number,
        default:0 
    }
    
});

module.exports = mongoose.model('Order', orderSchema); 