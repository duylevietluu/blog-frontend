import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import loginFormReducer from './reducers/loginFormReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogsReducer,
    loginForm: loginFormReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store