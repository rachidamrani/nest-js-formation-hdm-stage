import express from "express";
import schema from "../data/schema";
import { graphqlHTTP } from "express-graphql";

const PORT = 8000;

const app = express();

const root = {
  product: () => ({
    id: 1,
    name: "Product 1",
    description: "Product 1 description",
    price: 1000,
    soldOut: false,
    stores: [{ store: "Pasadena" }, { store: "Lost Angeles" }],
  }),
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}/graphql`)
);
