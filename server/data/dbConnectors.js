import mongoose from "mongoose";

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/widgets", {
  useNewUrlParser: true,
});

const widgetSchema = new mongoose.Schema({
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

const Widgets = mongoose.model("widget", widgetSchema, "widget");

export { Widgets };
