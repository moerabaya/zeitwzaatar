import { Cart } from "../../controllers/cart";
import { User } from "../../controllers/user";
import { ProductResolvers } from "./products";

export const resolvers = {
  ...ProductResolvers,
  ...new User().getResolvers(),
  ...new Cart(),
};

export default resolvers;
