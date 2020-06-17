import React from 'react';
import client from './apolloClient'
import { ApolloProvider } from 'react-apollo'
import Layout from './components/Layout/Layout';
import PostContainer from './components/containers/PostContainer/PostContainer'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <PostContainer />
      </Layout>
    </ApolloProvider>
  )
}

export default App
