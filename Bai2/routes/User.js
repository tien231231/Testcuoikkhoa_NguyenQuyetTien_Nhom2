
const userC = require("../controllers/userC")

const router = require("express").Router()

router.get("/",userC.getAllUser)


module.exports = router