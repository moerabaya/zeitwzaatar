import express from "express";
import { graphqlHTTP } from "express-graphql";
import path from "path";
import resolvers from "./data/resolvers";
import schema from "./data/schema";

const app = express();

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(3001, () =>
  console.log("Running server on port localhost:3001/graphql")
);
