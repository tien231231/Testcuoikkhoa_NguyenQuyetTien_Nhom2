const authC = require("../controllers/authC")


const router = require("express").Router()

router.post("/register",authC.registerUser)
router.post("/login",authC.loginUser)

router.post("/logout",authC.userLogout)
module.exports = router