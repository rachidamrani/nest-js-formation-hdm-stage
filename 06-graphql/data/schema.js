import { buildSchema } from "graphql";

const schema = buildSchema(`
        type Query {
            hello : String
            countries : [String]
        }

    `);

export default schema;
