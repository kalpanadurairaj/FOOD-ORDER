var express = require('express');
var router = express.Router();
const verifyUser=require('../middleware/userVerification')
const userController=require('../controllers/userController');


router.post('/register_user',userController.register_user);

router.post('/user_login',userController.user_login);


router.put("/update_user/:id",verifyUser,userController.update_user);


module.exports=router;