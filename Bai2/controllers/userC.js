const User = require("../models/User")

const userC = {
    getAllUser : async(req,res)=>{
        try{
            const user = await User.find()
            res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }
    },
    deleteUser : async(req,res) => {
        try{
            const user = await User.findByIdAndDelete(req.param.id) //findByIDandDelete :xoa trong database

            res.status(200).json("DELETE SUSCESS")
        }catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = userC