import cookieSession from "cookie-session";
import cors from "cors";
import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLError } from "graphql";
import { createProxyMiddleware } from "http-proxy-middleware";
import "./config/dbConnection";
import { ErrorCode, ServerError } from "./controllers/server-error";
import { resolvers, schema } from "./graphql/index";

export const app = express();

export type Context = {
  req: Request & {
    session: {
      userId: string;
      username: string;
      destroy: () => void;
    };
  };
  res: Response;
};

const proxyMiddleware = createProxyMiddleware({
  target: "http://127.0.0.1:3000",
  changeOrigin: true,
});

app.use(cors());
app.use(
  cookieSession({
    name: "session",
    keys: ["key-1", "key-2"],
  })
);

app.use("/graphql", (req, res, next) => {
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    context: { req, res },
    graphiql: true,
    customFormatErrorFn: (err: GraphQLError) => {
      const error = ServerError.getError(err.message as ErrorCode);
      return error;
    },
  })(req, res);
});

app.use("/logout", (req, res, next) => {
  req.session = null;
  let redirectTo = "";
  if (req.query?.["redirectTo"])
    redirectTo = req.query?.["redirectTo"]?.toString();
  res.redirect("/" + redirectTo);
});

// All other GET requests not handled before will return our React app
app.get("*", proxyMiddleware);

app.listen(3001, () =>
  console.log("Running server on port localhost:3001/graphql")
);
