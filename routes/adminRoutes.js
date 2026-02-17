const adminController=require('../controllers/adminController');
const express=require('express');
const router=express.Router();

router.post('/register',adminController.registration);
router.post('/login',adminController.login);

module.exports=router;
