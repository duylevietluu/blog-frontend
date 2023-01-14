import Blog from './Blog'

const Blogs = ({
    blogs,
    handleLike,
    currentUser,
    handleRemove
}) => {
    const sortedBlogs = [...blogs]
    sortedBlogs.sort((blog1, blog2) => blog1.likes > blog2.likes ? -1 : 1)
    return sortedBlogs.map(blog => 
        <Blog 
            key={blog.id} 
            blog={blog} 
            handleLike={handleLike} 
            currentUser={currentUser}
            handleRemove={handleRemove}
        /> )
}

export default Blogs