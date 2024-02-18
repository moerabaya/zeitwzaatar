import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  address: [
    {
      address: { type: addressSchema, required: true },
    },
  ],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
});

const Users = mongoose.model("user", userSchema);

export { Users };
