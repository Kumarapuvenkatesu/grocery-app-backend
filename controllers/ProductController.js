const product=require("../models/Product");

exports.createProduct=async(req,res)=>{
    try {
        const {name,desc,price,category,quantity,unit}=req.body;
        const image=req.file?`/uploads/${req.file.filename}` : null;
        const newProduct=new product({name,desc,price,category,quantity,unit,image});
        await newProduct.save();
        return res.status(201).json({msg:" Successfully Added Product",newProduct});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.getAllProducts=async(req,res)=>{
    try {
        const products=await product.find();
        res.status(200).json({msg:"Successfully fetch products",products});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.getEachProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const eachProduct=await product.findById(id);
        if(!eachProduct){
            return res.status(404).json({msg:"Product not found"});
        }
        res.status(200).json({msg:"Successfully fetch product",eachProduct});
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.deleteEachProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedProduct=await product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({msg:"Product not found"});
        }
        res.status(200).json({msg:"Successfully deleted product",deletedProduct});
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.updateEachProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedProduct=await product.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedProduct){
            return res.status(404).json({msg:"Product not found"});
        }
        res.status(200).json({msg:"Successfully updated product",updatedProduct});

    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}