var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');
const verifyAdmin = require('../middleware/adminVerification');


router.post('/admin_register',adminController.admin_register);
router.post('/admin_login',adminController.admin_login);
router.get("/view_user",verifyAdmin,adminController.view_user);
router.delete("/delete_user/:id",verifyAdmin,adminController.delete_user);



module.exports = router;







