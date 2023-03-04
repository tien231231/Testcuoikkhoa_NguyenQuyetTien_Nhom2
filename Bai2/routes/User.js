
const userC = require("../controllers/userC")

const router = require("express").Router()

router.get("/",userC.getAllUser)
router.delete("/:id", userC.deleteUser)


module.exports = router