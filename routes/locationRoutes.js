const locationController=require('../controllers/getLocationController');
const express=require('express');
const router=express.Router();

router.post('/get-location',locationController.getLocation);
router.post('/check-delivery-location',locationController.checkAvailableDeliveryLocation);

module.exports=router;