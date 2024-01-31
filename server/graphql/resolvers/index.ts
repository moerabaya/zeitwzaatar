import { Cart } from "../../controllers/cart";
import Category from "../../controllers/category";
import { User } from "../../controllers/user";
import { ProductResolvers } from "./products";

export const resolvers = {
  ...new ProductResolvers(),
  ...new Category(),
  ...new User().getResolvers(),
  ...new Cart(),
};

export default resolvers;
