import { ProductResolvers } from "./products";
import { UserResolvers } from "./users";

export const resolvers = { ...ProductResolvers, ...UserResolvers };

export default resolvers;
