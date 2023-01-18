import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogsReducer"

const BlogForm = () => {
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
    const [hidden, setHidden] = useState(true)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user)

    if (!currentUser) {
        return null
    }

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(createBlog(newBlog, currentUser))
        setNewBlog({ title: "", author: "", url: "" })
        setHidden(true)
    }

    const handleCancel = () => {
        setHidden(true)
        setNewBlog({ title: "", author: "", url: "" })
    }

    return (
        hidden ?

        <button className="btn btn-primary" onClick = {() => setHidden(false)}>
            new blog
        </button> :

        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>title: </Form.Label>
            <Form.Control type="text" name="title" value={newBlog.title} 
                onChange={({ target }) => setNewBlog({...newBlog, title: target.value})} />
            
            <Form.Label>author: </Form.Label>
            <Form.Control type="text" name="author" value={newBlog.author} 
                onChange={({ target }) => setNewBlog({...newBlog, author: target.value})} />

            <Form.Label>url: </Form.Label>
            <Form.Control type="text" name="url" value={newBlog.url} 
                onChange={({ target }) => setNewBlog({...newBlog, url: target.value})} />

            <Button variant="primary" type="submit">submit</Button>
            <Button variant="secondary" type="button" onClick={handleCancel}>cancel</Button>
        </Form.Group>
        </Form>
    )
}

export default BlogForm