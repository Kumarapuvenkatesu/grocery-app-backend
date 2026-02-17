const cartController=require("../controllers/cartController");
const {userVerifyMiddleware}=require("../middlewares/userVerifyMiddleware");

const express=require("express");
const router=express.Router();


router.post('/add-to-cart',userVerifyMiddleware,cartController.addToCart);
router.get('/get-cart-items',userVerifyMiddleware,cartController.getAllCartItems);

module.exports=router;