import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { displayMessage } from './messageReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },    
        addLike(state, action) {
            const id = action.payload
            return state.map(item => item.id === id ? {...item, likes: item.likes + 1} : item)
        },
        setBlogs(state, action) {
            return action.payload
        },
        destroyBlog(state, action) {
            const id = action.payload
            return state.filter(item => item.id !== id)
        },
        appendComment(state, action) {
            const { id, comment } = action.payload
            return state.map(item => item.id === id ? {...item, comments: item.comments.concat(comment)} : item)
        }
    },
})

const { appendBlog, appendComment, addLike, setBlogs, destroyBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blogInfo, currentUser) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blogInfo)
            dispatch(appendBlog({...newBlog, user: currentUser}))

            dispatch(displayMessage(true, `created new blog ${newBlog.title}`))
        } catch(error) {
            if (error.response === undefined || error.response.data === undefined) {
                dispatch(displayMessage(false, 'ERROR: unknown error, see console'))
                console.error(error.response || error)
            }
            else {
                dispatch(displayMessage(false, error.response.data.error))
            }
        }
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        try {
            const newBlog = {...blog, user: blog.user.id, likes: blog.likes + 1} 
            await blogService.update(blog.id, newBlog)
            dispatch(addLike(newBlog.id))
        } catch(error) {
            console.error(error)
        }
    }
}

export const removeBlog = id => {
    return async dispatch => {
        try {
            await blogService.remove(id)
            dispatch(destroyBlog(id))
            dispatch(displayMessage(true, `removed item successfully`))
        } catch (error) {
            dispatch(displayMessage(false, `error: cannot remove`))
            console.error(error.response || error)
        }
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        try {
            await blogService.createComment(id, comment)
            dispatch(appendComment({id, comment}))
            dispatch(displayMessage(true, `commented successfully`))
        } catch (error) {
            dispatch(displayMessage(false, `error: cannot comment`))
            console.error(error.response || error)
        }
    }
}

export default blogSlice.reducer
