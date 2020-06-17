import React from 'react';
import { useMutation } from '@apollo/react-hooks'
import classes from './Posts.module.css'

import GET_POSTS from '../../apollo/queries/posts'
import DEL_POST from '../../apollo/mutations/delPost'

const Posts = ({ data }) => {
  const [isError, setIsError] = React.useState({ status: false, error: null })
  const [delPost] = useMutation(DEL_POST, {
    update(cache, { data: { delPost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.filter(post => post.id !== delPost.id) }
      })
    }
  })

  const btnHandlerDel = id => {
    delPost({ variables: { id } }).catch(error => {
      console.log(error)
      setIsError({ status: true, error })
    })
  }

  if (data.length <= 0) return "No posts..."

  return (
    <>
      {isError.status 
        ? <div>{`${isError.error }`}</div>
        : null}
      {data.map((post, i) => {
        return (
          <div className={classes.Post} key={i}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
            <div className={classes.actions}>
              <svg onClick={() => btnHandlerDel(post.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Posts