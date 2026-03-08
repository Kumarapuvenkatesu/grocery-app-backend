const products = require('../models/Product');

exports.searchProducts = async (req, res) => {
    try {
        const {search}= req.query;
        if (!search) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        const searchProducts= await products.find({name:{$regex:search,$options:'i'}})
        res.status(200).json({msg:"Successfully searched products",searchProducts});
        
    } catch (error) {
        res.status(500).json({ message: 'Error searching products' });
    }
}