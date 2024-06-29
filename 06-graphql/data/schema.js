import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Product {
      id: ID
      name: String
      description: String
      price: Float
      soldOut: Soldout
      inventory: Int
      stores: [Store!]
    }


    enum Soldout {
        SOLDOUT
        ONSALE
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
      soldOut: Soldout
      inventory: Int
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
