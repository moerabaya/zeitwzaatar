import cors from "cors";
import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import path from "path";
import "./config/dbConnection";
import { resolvers, schema } from "./graphql/index";

const app = express();

const root = resolvers;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(3001, () =>
  console.log("Running server on port localhost:3001/graphql")
);
