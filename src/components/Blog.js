import { useState } from "react"

const Blog = ({ blog, handleLike, currentUser, handleRemove }) => {
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [hidden, setHidden] = useState(true)
  const removeable = currentUser.username === blog.user.username

  return(
    <div style={blogStyle}>
      <p>
        {blog.title}
        <button onClick={() => setHidden(!hidden)}>
          {hidden? "view" : "hide"}
        </button>
      </p>

      {hidden || <>
        <p>{blog.url}</p>
        <p>
          {blog.likes} 
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>{blog.author}</p>
        {removeable && <button onClick={() => handleRemove(blog)}>remove</button>}
      </>}
    </div>  
  )
}


export default Blog