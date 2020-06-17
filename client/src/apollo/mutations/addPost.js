import gql from 'graphql-tag'

const ADD_POST = gql`
  mutation($title: String! $description: String!) {
    addPost(title: $title description: $description) {
      id
      title
      description
    }
  }
`

export default ADD_POST