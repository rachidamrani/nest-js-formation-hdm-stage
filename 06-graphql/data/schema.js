import { buildSchema } from "graphql";

const schema = buildSchema(`

    type Product {
        id : ID!
        name: String!
        description: String
        price : Float!
        soldOut : Boolean!
        stores : [Store!]
    }
    
    type Query {
        product : Product
    }

    type Store {
        store : String
    }
`);

export default schema;
