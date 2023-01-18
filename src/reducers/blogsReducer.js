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

export const createBlog = blogInfo => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blogInfo)
            dispatch(appendBlog(newBlog))

            dispatch(displayMessage(`SUCCESS: created new blog ${newBlog.title}`))
        } catch(error) {
            if (error.response === undefined || error.response.data === undefined) {
                dispatch(displayMessage('ERROR: unknown error, see console'))
                console.error(error.response || error)
            }
            else {
                dispatch(displayMessage('ERROR: ' + error.response.data.error))
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
            dispatch(displayMessage(`SUCCESS: removed item`))
        } catch (error) {
            dispatch(displayMessage(`ERROR: cannot remove`))
            console.error(error.response || error)
        }
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        try {
            await blogService.createComment(id, comment)
            dispatch(appendComment({id, comment}))
            dispatch(displayMessage(`SUCCESS: commented`))
        } catch (error) {
            dispatch(displayMessage(`ERROR: cannot comment`))
            console.error(error.response || error)
        }
    }
}

export default blogSlice.reducer
