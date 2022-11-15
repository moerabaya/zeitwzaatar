import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL Application");
});

const rootValue = {
  hello: () => "Hi, I am Moe",
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
