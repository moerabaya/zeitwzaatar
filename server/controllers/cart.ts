import { Types } from "mongoose";
import { Context } from "..";
import { CartInput } from "../graphql/resolvers/types";
import { Cart as CartSchema } from "../models/Cart";
import { Products } from "../models/Products";
import { ServerError } from "./server-error";

export class Cart {
  constructor() {
    return {
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      getAllCartItems: this.getAllCartItems,
    };
  }

  async getAllCartItems(_: any, { req, res }: Context) {
    try {
      let cart = await CartSchema.findOne({
        userId: req.session.userId,
      });

      return cart?.products.map(async (item) => {
        const product = await Products.findById(item.id);
        console.log({ ...item });
        return { id: item.id, quantity: item.quantity, name: product?.name };
      });
    } catch (error) {
      throw new ServerError("SERVER_ERROR");
    }
  }

  async removeFromCart({ input }: { input: CartInput }, { req }: Context) {
    try {
      let cart = await CartSchema.findOne({
        userId: req.session.userId,
      });
      console.log(cart);
      if (!cart) return Promise.reject(new ServerError("PRODUCT_DOESNT_EXIST"));

      const product = cart?.products.find((p) => p.id.equals(input.id));

      if (!product)
        return Promise.reject(new ServerError("PRODUCT_DOESNT_EXIST"));

      if (product.quantity > 0) {
        if (product.quantity > input.quantity)
          product.quantity -= input.quantity;
        else product.quantity = 0;
      }

      if (product.quantity < 1)
        cart?.products.splice(cart?.products.indexOf(product), 1);

      if (cart?.products.length === 0)
        return await CartSchema.remove({ userId: req.session.userId });

      await cart?.save();

      return cart?.products ?? [];
    } catch (error) {
      throw new ServerError("SERVER_ERROR");
    }
  }

  async addToCart({ input }: { input: CartInput }, { req }: Context) {
    try {
      const productExists = await Products.findById(input.id);

      if (!productExists)
        return Promise.reject(new ServerError("PRODUCT_DOESNT_EXIST"));

      let cart = await CartSchema.findOne({
        userId: req.session.userId,
      });
      if (!cart)
        cart = new CartSchema({
          userId: req.session.userId,
          products: [],
        });

      const existingProduct = cart.products.find((p) => p.id.equals(input.id));

      if (existingProduct) {
        existingProduct.quantity += input.quantity;
      } else {
        cart.products.push({
          id: new Types.ObjectId(input.id),
          quantity: input.quantity,
        });
      }

      await cart.save();

      return cart.products;
    } catch (error) {
      throw new ServerError("SERVER_ERROR");
    }
  }
}
