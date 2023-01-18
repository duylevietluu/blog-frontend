import { useDispatch, useSelector } from "react-redux"
import { addComment, likeBlog, removeBlog } from "../reducers/blogsReducer"
import { useParams } from 'react-router-dom'
import { useState } from "react"


const Blog = () => {
  const [comment, setComment] = useState("")

  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(item => id === item.id)

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  if (!blog || !currentUser) {
    return null
  }

  const removeable = currentUser.username === blog.user.username
  const handleRemove = blog => {
    if (window.confirm(`remove ${blog.title}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const handleComment = event => {
    event.preventDefault()
    dispatch(addComment(id, comment))
    setComment("")
  }

  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} 
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      <p>{blog.user.name}</p>
      {removeable && <button onClick={() => handleRemove(blog)}>remove</button>}

      <h3>Comments</h3>
      <form onSubmit={handleComment}>
            <input type="text" value={comment} name="comment" 
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">submit</button> 
        </form>
      <ul>
        {blog.comments.map((item, id) => <li key={id}>{item}</li>)}
      </ul>
    </div>  
  )
}

export default Blog