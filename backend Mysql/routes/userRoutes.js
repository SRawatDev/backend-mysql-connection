const router = require('express').Router();
const usercontroller=require("../controllers/usercontroller")
router.post("/signup",usercontroller.createUser)
router.post("/login",usercontroller.login)
module.exports=router