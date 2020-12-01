module.exports = `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
  }

  type Query {
    users: [User] 
    user(id: Int!): User!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): [User!]
    deleteUser(id: Int!): [User!]
  }
`;