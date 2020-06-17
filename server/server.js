const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server')
const posts = require('./db/posts')

const startServer = ({ port }) => {

  const typeDefs = gql`
    type Query {
      posts: [Post]
    }

    type Mutation {
      addPost(title: String! description: String!): Post
      delPost(id: ID!): Post
    }
    
    type Post {
      id: ID
      title: String
      description: String
    }
  `
  const resolvers = {
    Query: {
      posts: () => posts
    },
    
    Mutation: {
      addPost: (_, { title, description }) => {
        const newPost = { id: Date.now().toString(), title, description }
          posts.push(newPost)

        return newPost
      },
      delPost: (_, { id }) => {
        const index = posts.findIndex(post => post.id === id)
        const deletedPost = posts[index]
        
        if (index > -1) {
          posts.splice(index, 1)
          return deletedPost
        } else {
          throw new Error('Post not found')
        }
      }
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers })
  server.listen(port, () => console.log(`Apollo server is running on port: ${port}`))

}

startServer({ port: 3001 })