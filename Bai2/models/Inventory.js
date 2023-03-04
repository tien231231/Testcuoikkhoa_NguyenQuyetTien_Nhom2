const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const inventorySchema = new Schema({
  _id: Schema.Types.String,
  sku: Schema.Types.String,
  description: Schema.Types.String,
  instock: Schema.Types.String,
});

const inventoryModel = mongoose.model("inventorys", inventorySchema);
module.exports = inventoryModel;
