module.exports = `
  type User {
    id: Int!
    firstName: String
    lastName: String
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }
`;