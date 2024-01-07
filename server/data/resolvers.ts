import { reject } from "lodash";
import { Widgets } from "./dbConnectors";
import { Product } from "./types";

export const resolvers = {
  getProduct: ({ id }: { id: string }) => {
    return new Promise((resolve) => {
      Widgets.findById({ _id: id }, (err: Error, product: Product) => {
        if (err) reject(err);
        else resolve(product);
      });
    });
  },
  getAllProducts: () => {
    return Widgets.find({});
  },
  createProduct: ({ input }: { input: Product }) => {
    const newWidget = new Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      stores: input.stores,
    });

    newWidget.id = newWidget._id;
    return new Promise((resolve) => {
      newWidget.save((err) => {
        if (err) return reject(err);
        else resolve(newWidget);
      });
      // my approuch
      //   Widgets.create(input, function (err, small) {
      //     if (err) return reject(err);
      //     else resolve(small);
      //   });
    });
  },
  updateProduct: ({ input }: { input: Product }) => {
    return new Promise((resolve) => {
      Widgets.findOneAndUpdate(
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
      Widgets.remove({ _id: id }, (err) => {
        if (err) reject(err);
        else resolve(`Successfully deleted widget with id: ${id}`);
      });
    });
  },
  getProductsByName: async ({ name }: { name: string }) => {
    return new Promise((resolve) => {
      Widgets.find(
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

export default resolvers;
