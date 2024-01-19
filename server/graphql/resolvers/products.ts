import { reject } from "lodash";
import { Products } from "../../models/Products";
import { Product } from "./types";

export const ProductResolvers = {
  getProduct: ({ id }: { id: string }) => {
    return new Promise((resolve) => {
      Products.findById({ _id: id }, (err: Error, product: Product) => {
        if (err) reject(err);
        else resolve(product);
      });
    });
  },
  getAllProducts: () => {
    return Products.find({});
  },
  createProduct: ({ input }: { input: Product }) => {
    const newProduct = new Products({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      stores: input.stores,
    });

    newProduct.id = newProduct._id;
    return new Promise((resolve) => {
      newProduct.save((err) => {
        if (err) return reject(err);
        else resolve(newProduct);
      });
      // my approuch
      //   Products.create(input, function (err, small) {
      //     if (err) return reject(err);
      //     else resolve(small);
      //   });
    });
  },
  updateProduct: ({ input }: { input: Product }) => {
    return new Promise((resolve) => {
      Products.findOneAndUpdate(
        { _id: input.id },
        input,
        {
          new: true,
        },
        (err, product) => {
          if (err) reject(err);
          else resolve(product);
        }
      );
    });
  },
  deleteProduct: ({ id }: { id: string }) => {
    return new Promise((resolve) => {
      Products.remove({ _id: id }, (err) => {
        if (err) reject(err);
        else resolve(`Successfully deleted products with id: ${id}`);
      });
    });
  },
  getProductsByName: async ({ name }: { name: string }) => {
    return new Promise((resolve) => {
      Products.find(
        {
          name: {
            $regex: name,
            $options: "i",
          },
        },
        async (error: Error, products: Product[]) => {
          if (error) reject(error);
          resolve(products);
        }
      );
    });
  },
};
