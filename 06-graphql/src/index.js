import express from "express";
import schema from "../data/schema";
import { graphqlHTTP } from "express-graphql";

const PORT = 8000;

const app = express();

const root = {
  product: () => ({
    id: 1,
    name: "Product 1",
    description: "This is product 1",
    price: 1000,
    soldOut: false,
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
