const Category = require('../models/Category'); 
exports.createCategory =async (req, res) => {
    try {
        const foundCategory = await Category.findOne({ category_name: req.body.category_name,category_id:req.body.category_id });
        if (foundCategory) {
            return res.status(400).json({ msg: "Category already exist try adding it with a different name" });
        }
        const newCategory = new Category(req.body);
        newCategory.save()
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

exports.getCategories = async (req, res) => {
    try {
        const id = req.params.id;
        Category.find({category_id : id })
            .exec((err, categories) => {
                if (err || !categories) {
                    return res.status(404).json({ msg: "No categories found" }); 
                }
                return res.status(200).json(categories);
        })
    } catch (error) {
        console.log(error);
    }
}