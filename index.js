import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL Application");
});

const rootValue = {
  product: () => {
    return {
      id: 23124,
      name: "widget",
      description: "Beautiful widget to use in your garden",
      price: 33.99,
      soldout: false,
      stores: [
        {
          store: "Pasadena",
          amount: 3,
        },
        {
          store: "Los Angeles",
          amount: 1,
        },
      ],
    };
  },
  createProduct: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");
    productDatabase[id] = input;
    return new Product(id);
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);
app.listen(8080, () =>
  console.log("Running server on port localhost:8080/graphql")
);
