import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Product {
      id: ID
      name: String
      description: String
      price: Float
      soldOut: Boolean
      stores: [Store!]
    }
  
    type Store {
      store: String
    }
  
    input StoreInput {
      store: String!
    }
  
    input ProductInput {
      id: ID
      name: String
      description: String
      price: Float
      soldOut: Boolean
      stores: [StoreInput!]!
    }
  
    type Query {
      getProduct(id: ID!): Product
    }
  
    type Mutation {
      createProduct(input: ProductInput!): Product
    }
  `);

export default schema;
