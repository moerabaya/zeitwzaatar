import { buildSchema } from "graphql";

const schema = buildSchema(`
	type Store {
		store: String
		amount: Float
	}
	type Product {
		id: ID
		name: String
		description: String
		price: Float
		soldout: Boolean
		stores: [Store]!
	}

	input StoreInput {
		store: String
		amount: Float
	}

	input ProductInput {
		id: ID
		name: String
		description: String
		price: Float
		soldout: Boolean
		stores: [StoreInput]!
	}

	type Query {
		product: Product
	}

	type Mutation {
		createProduct(input:ProductInput): Product
	}
`);

export default schema;
