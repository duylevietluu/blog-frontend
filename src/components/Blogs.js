import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'


const Blogs = () => {
    const blogStyle = {
        paddingTop: 2,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const sortedBlogs = [...useSelector(state => state.blogs)]
    sortedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    return (<>
        <BlogForm />
        <h2>blogs feed</h2>
        {sortedBlogs.map(blog => 
            <div style={blogStyle} key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                </Link>
            </div>
        )}
    </>)
}

export default Blogs