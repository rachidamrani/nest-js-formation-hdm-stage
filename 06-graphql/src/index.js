import express from "express";
import schema from "../data/schema";
import { graphqlHTTP } from "express-graphql";

const PORT = 8000;

const app = express();

const root = {
  hello: () => "Hi, I'm Manny!",
  countries: () => ["France", "Belgium"],
};

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}/graphql`)
);
