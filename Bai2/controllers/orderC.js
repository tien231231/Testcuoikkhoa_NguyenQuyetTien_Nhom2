const Order = require("../models/Order")

const userC = {
    getAll : async(req,res)=>{
        try{
            const order = await Order.find()
            // const orders = req.body;
            // const collection = db.collection('orders');
            
            // res.status(200).json(user)
            // collection.insertMany(orders, (err, result) => {
            //     if (err) throw err;
            //     res.json(result);
            //     client.close();
            //   });
              res.status(200).json(order)
        }catch(err){
            res.status(500).json(err)
        }
    },
    
}
module.exports = userC