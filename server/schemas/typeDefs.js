const typeDefs = `
type User {
  _id: ID!
  firstName: String
  lastName: String
  email: String!
  orders: [Order]
  items: [Item]
}
  type Category {
    _id: ID
    name: String!
  }

  type Item {
    _id: ID!
    name: String!
    description: String!
    price: Float
    quantity: Int
    image: String
  }

  type Order {
    _id: ID!
    purchaseDate: String
    items: [Item]
  }

 

  type Checkout {
    session: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    categories: [Category]
    items(category: ID, name: String): [Item]
    item(_id: ID!): Item
    user: User
    order(_id: ID!): Order
    checkout(items: [ID]!): Checkout
    users: [User]
  }

  type RemoveItemPayload {
    success: Boolean
    message: String
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(userId: [ID]!, items: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addItem(name: String!, price: Int, description: String!): Item
    removeItem(userId: ID!, itemId: ID!): RemoveItemPayload
    updateItem(_id: ID!, quantity: Int!): Item
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs
