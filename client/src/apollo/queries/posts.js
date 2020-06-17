import gql from 'graphql-tag'

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      description
    }
  }
`

export default GET_POSTS