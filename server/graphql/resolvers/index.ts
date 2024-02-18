import { Cart } from "../../controllers/cart";
import Category from "../../controllers/category";
import Order from "../../controllers/order";
import { User } from "../../controllers/user";
import { ProductResolvers } from "./products";

export const resolvers = {
  ...new ProductResolvers(),
  ...new Category(),
  ...new User().getResolvers(),
  ...new Cart(),
  ...new Order(),
};

export default resolvers;
