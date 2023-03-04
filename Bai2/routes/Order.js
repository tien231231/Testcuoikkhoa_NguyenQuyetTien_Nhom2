
const orderC = require("../controllers/orderC")

const router = require("express").Router()

router.get("/",orderC.getAll)


module.exports = router