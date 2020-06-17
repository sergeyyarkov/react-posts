import React from 'react';
import { Query } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import Posts from '../../Posts/Posts'
import classes from './PostContainer.module.css'

import GET_POSTS from '../../../apollo/queries/posts'
import ADD_POST from '../../../apollo/mutations/addPost'

const PostContainer = () => {

  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.concat([addPost]) }
      })
    }
  })
  
  const formHandlerAdd = e => {
    try {
      e.preventDefault()
      const target = e.target
      
      addPost({variables: {
        title: target.elements.title.value,
        description: target.elements.description.value
      }})

      target.elements.title.value = ''
      target.elements.description.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.PostContainer}> 
      <h1 className={classes.heading}><span role='img' aria-label='react'>⚛️</span> React Posts</h1>
      <form onSubmit={formHandlerAdd} className={classes.form}>
        <div className={classes.formInputs}>
          <input placeholder='title' name='title' type="text"/>
          <input placeholder='description...' name='description' type="text" />
        </div>
        <div>
          <button className={classes.formButton} type='submit'>Add Post</button>
        </div>
      </form>
      <div className={classes.posts}>
        <Query query={GET_POSTS }>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error: ${error}`

            return <Posts data={data.posts} />
          }}
        </Query>
      </div>
    </div>
  )
}

export default PostContainer