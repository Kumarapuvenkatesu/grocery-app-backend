const Cart=require("../models/Cart");
const Product=require("../models/Product");

exports.addToCart=async(req,res)=>{
    try {const {productId,quantity}=req.body;
    const userId=req.userId;
        if(!productId || !quantity){
            return res.status(400).json({msg:"Product ID and Quantity are required"});
        }
    let product= await Product.findById(productId);
    if(!product){
        return res.status(404).json({msg:"Product not found"});
    }
    let cart=await Cart.findById(userId);
    if(!cart){
        cart=await Cart.create({userId,items:[{productId,quantity}]});
        res.status(200).json({msg:"Product added to cart successfully",cart});
    }
    const existingProduct=cart.items.findIndex(item=>item.productId.toString()===productId);
    if(existingProduct>-1){
        cart.items[existingProduct].quantity+=quantity;
    }else{
        cart.items.push({productId,quantity});
    }
    await cart.save();
    res.status(200).json({msg:"Product added to cart successfully",cart});
        
    } catch (error) {
       res.status(500).json({msg:error.message}); 
    }
}

exports.getAllCartItems=async(req,res)=>{
    try {
        const userId=req.userId;
        const cart=await Cart.findOne({userId}).populate("items.productId","name price image des");
        res.status(200).json({msg:"Cart fetched successfully",cart});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

// exports.removeFromCart=async(req,res)=>{
//     try {
//         const userId=req.userId;
//         const {productId}=req.body;
//         let cart=await Cart.findOne({userId});
//         if(!cart){
//             return res.status(404).json({msg:"Cart not found"});
//         }
//         cart.items=cart.items.filter(item=>item.productId.toString()!==productId);
//         await cart.save();
//         res.status(200).json({msg:"Product removed from cart successfully",cart});
//     } catch (error) {
//         res.status(500).json({msg:error.message});
//     }
// }

// exports.eachCartItem=async(req,res)=>{
//     try {
//         const userId=req.userId;
//         const {productId}=req.body;
//         let cart=await Cart.findOne({userId});
//         if(!cart){
//             return res.status(404).json({msg:"Cart not found"});
//         }
//         const cartItem=cart.items.find(item=>item.productId.toString()===productId);
//         if(!cartItem){
//             return res.status(404).json({msg:"Cart item not found"});
//         }
//         res.status(200).json({msg:"Cart item fetched successfully",cartItem});
//     } catch (error) {
//         res.status(500).json({msg:error.message});
//     }
// }