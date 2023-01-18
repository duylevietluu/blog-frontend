import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogsReducer"

const BlogForm = () => {
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
    const [hidden, setHidden] = useState(true)
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(createBlog(newBlog))
        setNewBlog({ title: "", author: "", url: "" })
        setHidden(true)
    }

    const handleCancel = () => {
        setHidden(true)
        setNewBlog({ title: "", author: "", url: "" })
    }

    return (
        hidden ?
        
        <button onClick = {() => setHidden(false)}>new blog</button> :

        <form onSubmit={handleSubmit}>
            <strong>create new blog</strong>
            <div>
                title 
                <input
                    id="title"
                    type="text"
                    value={newBlog.title}
                    name="title"
                    onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
                />
            </div>
            <div>
                author 
                <input
                    id="author"
                    type="text"
                    value={newBlog.author}
                    name="author"
                    onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
                />
            </div>
            <div>
                url 
                <input
                    id="url"
                    type="text"
                    value={newBlog.url}
                    name="url"
                    onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
                />
            </div>
            <button type="submit">submit</button> 
            <button type="button" onClick={handleCancel}>cancel</button>
        </form>
    )
}

export default BlogForm