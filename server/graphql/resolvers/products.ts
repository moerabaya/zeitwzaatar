import Category from "../../models/Categories";
import { Products } from "../../models/Products";
import { Product } from "./types";

export class ProductResolvers {
  constructor() {
    return {
      getProduct: this.getProduct,
      getAllProducts: this.getAllProducts,
      createProduct: this.createProduct,
      updateProduct: this.updateProduct,
      deleteProduct: this.deleteProduct,
      getProductsByName: this.getProductsByName,
    };
  }

  async getProduct({ id }: { id: string }) {
    try {
      const product = await Products.findById(id).exec();
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      const categories = await Category.find({
        _id: { $in: product.categories },
      });
      return { ...JSON.parse(JSON.stringify(product)), categories };
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  async getAllProducts() {
    return Products.find({}).exec();
  }

  async createProduct({ input }: { input: Product }) {
    try {
      const newProduct = new Products({
        name: input.name,
        description: input.description,
        price: input.price,
        soldout: input.soldout,
        stores: input.stores,
      });
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async updateProduct({ input }: { input: Product }) {
    try {
      const updatedProduct = await Products.findOneAndUpdate(
        { _id: input.id },
        input,
        { new: true }
      ).exec();
      if (!updatedProduct) {
        throw new Error(`Product with id ${input.id} not found`);
      }
      const categories = await Category.find({
        _id: { $in: updatedProduct.categories },
      });
      return { ...JSON.parse(JSON.stringify(updatedProduct)), categories };
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async deleteProduct({ id }: { id: string }) {
    try {
      await Products.deleteOne({ _id: id }).exec();
      return `Successfully deleted product with id: ${id}`;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  async getProductsByName({ name }: { name: string }) {
    try {
      const products = await Products.find({
        name: { $regex: name, $options: "i" },
      }).exec();
      return products;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to fetch products by name: ${error.message}`);
    }
  }
}
