import { useDispatch, useSelector } from "react-redux"
import { addComment, likeBlog, removeBlog } from "../reducers/blogsReducer"
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from "react"
import { Button, Form, Table } from "react-bootstrap"


const Blog = () => {
  const [comment, setComment] = useState("")

  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(item => id === item.id)

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const navigate = useNavigate()

  const removeable = currentUser && currentUser.username === blog.user.username
  const handleRemove = blog => {
    if (window.confirm(`remove ${blog.title}?`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  const handleComment = event => {
    event.preventDefault()
    dispatch(addComment(id, comment))
    setComment("")
  }

  return( blog && 
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>

      <p className="">
        <span className="p-2">{blog.likes}</span>
        <Button size='sm' onClick={() => dispatch(likeBlog(blog))}>like</Button>
      </p>
      <p>posted by {blog.user.name}</p>
      {removeable && <Button size='sm' variant="danger" onClick={() => handleRemove(blog)}>Remove</Button>}


      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Label size='sm'>Leave a Comment</Form.Label>
          <Form.Control size='sm' type="text" value={comment} name="comment" 
            onChange={({ target }) => setComment(target.value)} />
          <Button size='sm' variant="primary" type="submit">comment</Button>
        </Form.Group>
      </Form>

      <Table striped>
        <tbody>
          {blog.comments.map((item, id) => <tr key={id}><td>{item}</td></tr>)}
        </tbody>
      </Table>
    </div>  
  )
}

export default Blog