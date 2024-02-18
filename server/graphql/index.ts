import { readFileSync } from "fs";
import { makeExecutableSchema } from "graphql-tools";
import { join } from "path";
import resolvers from "./resolvers";

const productSchema = readFileSync(
  join(__dirname, "schemas/product.gql"),
  "utf-8"
);

const uesrSchema = readFileSync(join(__dirname, "schemas/user.gql"), "utf-8");
const indexSchema = readFileSync(join(__dirname, "schemas/index.gql"), "utf-8");
const cartSchema = readFileSync(join(__dirname, "schemas/cart.gql"), "utf-8");
const categorySchema = readFileSync(
  join(__dirname, "schemas/category.gql"),
  "utf-8"
);
const orderSchema = readFileSync(join(__dirname, "schemas/order.gql"), "utf-8");

const schema = makeExecutableSchema({
  typeDefs: [
    indexSchema,
    productSchema,
    uesrSchema,
    cartSchema,
    categorySchema,
    orderSchema,
  ],
});

export { resolvers, schema };
