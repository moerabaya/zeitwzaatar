import { User } from "../../controllers/user";
import { ProductResolvers } from "./products";

export const resolvers = {
  ...ProductResolvers,
  ...new User().getResolvers(),
};

export default resolvers;
