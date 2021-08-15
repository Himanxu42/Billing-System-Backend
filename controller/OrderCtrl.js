const Order = require('../models/Order');
const Product = require('../models/Product') ; 
exports.createOrder = (req, res) => {
  
    const id = req.params.id;  
    //create different write operation for 
    const productUpdateOperation =  req.body.products.map(product =>{
        return { 
        updateOne : {
            filter : {_id:product.item._id},
            update : {stock : Math.round(product.item.stock - product.select) }
        }
    }}) 

    Product.bulkWrite(productUpdateOperation)
    const toSave = {
        order_user_id: id,
        orders: req.body.products,
        total: req.body.total
    };
    const newOrder = new Order(toSave);
    newOrder.save()
        .then((success) => {
            return res.status(200).json(success);
        })
        .catch(err => {
            return res.status(400).json({ msg: err });
        })
}

exports.getOrderById = async (req, res) => {
    try {
        const { userid, orderid } = req.params;
        const foundOrder = await Order.findOne({ _id: orderid, order_user_id: userid })
            .exec();
        if (foundOrder) {
            return res.status(200).json(foundOrder);
        }
        return res.status(404).json({ status: 'Order not found' });
    }
    catch (e) {
        return res.status(404).json({ msg: "Order not found" });
    }
}