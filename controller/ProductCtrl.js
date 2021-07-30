const Product = require('../models/Product'); 
exports.createProduct =async (req, res) => {
    try {
        const foundProduct = await Product.findOne({ product_name: req.body.product_name });
        if (foundProduct) {
            return res.status(400).json({ msg: "Product already exist try adding it with a different name" });
        }
        const newProduct = new Product(req.body);
        newProduct.save()
            .then(success => {
                return res.status(200).json(success); 
            })
            .catch(err => {
                return res.status(401).json({ msg: 'Bad Request' });
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getProducts = async (req, res) => {
    try {
        Product.find()
            .populate('category')
            .exec((err, products) => {
                if (err || !products) {
                    return res.status(404).json({ msg: "No products found" }); 
                }
                return res.status(200).json(products);
        })
    } catch (error) {
        console.log(error);
    }
}

exports.searchProducts = async (req, res) => {
    const toSearch = req.params.search;

    try {
        const products = await Product.find({ product_name: { $regex: new RegExp("^" + toSearch.toLowerCase(), "i") } });
        if (products) {
            return res.status(200).json(products)
        }
        return res.status(404).json({msg:'Not found'})
    } catch (error) {
     console.log(error);   
    }
}

exports.addDiscount = async (req, res) => {
    const id = req.params.id;
    const discount = req.body.discount/100;
    const mrp = req.body.mrp;
    const discounted_mrp = mrp - (discount * mrp);

    try {
        const updatedProduct =await Product.findByIdAndUpdate(id,{discount:req.body.discount,discounted_mrp:discounted_mrp},{new:true});
        if (updatedProduct) {
            return res.status(200).json(updatedProduct); 
        }
        return res.status(404).json({ msg: 'Product not found' });
    } catch (error) {
        
    }
}