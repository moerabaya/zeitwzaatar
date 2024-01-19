import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  soldout: {
    type: String,
  },
  inventory: {
    type: String,
  },
  stores: {
    type: Array,
  },
});

const Products = mongoose.model("product", productSchema);

export { Products };
