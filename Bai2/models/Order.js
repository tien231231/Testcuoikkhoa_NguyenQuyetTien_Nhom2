const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema({
  _id: Schema.Types.Number,
  item: Schema.Types.String,
  price: Schema.Types.Number,
  quantity: Schema.Types.Number,
});

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
