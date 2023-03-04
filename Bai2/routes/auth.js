const authC = require("../controllers/authC")


const router = require("express").Router()

router.post("/register",authC.registerUser)
router.post("/login",authC.loginUser)


module.exports = router