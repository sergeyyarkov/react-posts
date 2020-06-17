import gql from 'graphql-tag'

const DEL_POST = gql`
  mutation($id: ID!) {
    delPost(id: $id) {
      id
      title
      description
    }
  }
`

export default DEL_POST