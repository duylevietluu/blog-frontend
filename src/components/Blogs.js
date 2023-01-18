import { Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const BlogButton = ({ blog }) => {
    return (
        <div className="col-12 col-md-4 col-lg-3">
            <Link to={`/blogs/${blog.id}`}>
                {blog.title}
            </Link>
        </div>
    )
}

const Blogs = () => {
    const sortedBlogs = [...useSelector(state => state.blogs)]
    sortedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    return (<>
        <h2>Blogs Feed</h2>
        <BlogForm />
        <Row>
            {sortedBlogs.map(blog => <BlogButton blog={blog} key={blog.id} />)}
        </Row>
    </>)
}

export default Blogs