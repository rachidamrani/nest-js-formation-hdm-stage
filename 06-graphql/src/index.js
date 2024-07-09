import express from "express";
import schema from "../data/schema";
import { graphqlHTTP } from "express-graphql";
import resolvers from "../data/resolvers";

const PORT = 8000;
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

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}/graphql`)
);
