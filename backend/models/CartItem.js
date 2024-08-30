const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productImage: { type: String, required: false },
  dateAdded: { type: Date, default: Date.now },
  productDealer: { type: String, required: true },
  username: { type: String, required: true }, // Add the username field
}, { collection: 'cartitems' });

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
