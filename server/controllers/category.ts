import { Context } from "..";
import { CategoryInput } from "../graphql/resolvers/types";
import { default as CategorySchema } from "../models/Categories";

class Category {
  constructor() {
    return {
      createCategory: this.createCategory,
      getCategories: this.getCategories,
    };
  }

  createCategory({ input }: { input: CategoryInput }, context: Context) {
    return new Promise((resolve, reject) => {
      const category = new CategorySchema({
        name: input.name,
      });
      category.id = category._id;

      category.save((error) => {
        if (error) reject(error);
        resolve(category);
      });
    });
  }
  getCategories(_: unknown, context: Context) {
    return CategorySchema.find({});
  }
}

export default Category;
