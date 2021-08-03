const Product = require('../models/Product'); 
exports.createProduct = async (req, res) => {
   
    try {
       
        const foundProduct = await Product.findOne({ product_name: req.body.product_name, product_id:req.body.product_id});
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
        const id = req.params.id; 
            Product.find({product_id:id})
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
    const id = req.params.id;
    try {
        const products = await Product.find({ product_name: { $regex: new RegExp("^" + toSearch.toLowerCase(), "i") }, product_id:id });
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

exports.updateProduct = async(req, res) => {
   try {
    const id = req.params.id;
    const initialState = req.body.initial;
    const finalState = req.body.final;
    //if product name needs to be changed as it is unique for every product 
    if (initialState.product_name !== finalState.product_name) {
        //do 
        const ifProductWithSameName = await Product.findOne({ product_name: finalState.product_name })
        console.log(ifProductWithSameName)
        if (ifProductWithSameName) {
            return res.status(400).json({ msg: 'Same Product name already exist' });
        }
       }
       Product.findByIdAndUpdate(id, finalState, { new: true })
           .populate('category')
       .exec( (err, updatedProduct) => {
        if (err || !updatedProduct) {
            return res.status(400).json({ msg: 'Unable to update product' });
        }
        return res.status(200).json(updatedProduct);
    })
       
   } catch (error) {
       console.log(error);
   }
}

exports.deleteProduct = (req, res) => {
    const product_id = req.params.id;
    console.log(product_id  )
    try {
        Product.findByIdAndDelete(product_id) //cannnot pass options in find_by_id_and_delete
            .exec((err, result) => {
                if (err||!result) {
                    return res.status(400).json({ message: "something went wrong" });
                }
                return res.status(200).json(result);
        })
    } catch (error) {
        console.log(error);
    }
}