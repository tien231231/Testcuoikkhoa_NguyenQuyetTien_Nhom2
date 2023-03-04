
const inventoryC = require("../controllers/inventoryC")
const userC = require("../controllers/userC")

const router = require("express").Router()

router.get("/getall", inventoryC.getAll)
router.get("/get", inventoryC.get)


module.exports = router