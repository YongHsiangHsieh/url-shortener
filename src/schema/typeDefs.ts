export const typeDefs = `#graphql
  scalar Date

  type ShortenedURL {
    originalUrl: String!
    shortCode: String!
    expiresAt: Date
  }

  type Query {
    getUrl(shortCode: String!): ShortenedURL
  }

  type Mutation {
    createUrl(originalUrl: String!, shortCode: String, ttl: Int): ShortenedURL
    updateUrl(shortCode: String!, originalUrl: String!): ShortenedURL
    deleteUrl(shortCode: String!): Boolean
  }
`; 