const inventory = require("../models/Inventory")

const inventoryC = {
    getAll : async(req,res)=>{
        try{
            const done = await inventory.find()
            res.status(200).json(done)
        }catch(err){
            res.status(500).json(err)
        }
    },
    get : async(req,res)=>{
        try{
            const donee = await inventory.find({ instock: { $ne: 120 } })
            res.status(200).json(donee)
        }catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = inventoryC