const productController=require("../controllers/ProductController");
const express=require("express");
const upload=require("../middlewares/imageMiddleware");
const middieWeare=require("../middlewares/adminAccessMiddleware");
const router=express.Router();


//Create a new product
router.post("/add-product",middieWeare.adminAccessMiddleware,upload.single("image"),productController.createProduct);
router.get("/get-products",productController.getAllProducts);
router.get("/get-product/:id",productController.getEachProduct);
router.delete("/delete-product/:id",productController.deleteEachProduct);
router.put("/update-product/:id",upload.single("image"),productController.updateEachProduct );

module.exports=router;