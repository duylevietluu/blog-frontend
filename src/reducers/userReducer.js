import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayMessage } from './messageReducer'
import { resetLogin } from './loginFormReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        initUser(state, action) {
            const loggedUserJSON = window.localStorage.getItem('loggedUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                blogService.setToken(user.token)
                return user
            } else {
                return null
            }
        },
        setUser(state, action) {
            return action.payload
        },
        logoutUser(state, action) {
            window.localStorage.removeItem('loggedUser')
            console.log(window.localStorage)
            blogService.setToken(null)
            return null
        }
    },
})

export const { setUser, initUser, logoutUser } = userSlice.actions

export const loginUser = userLogInfo => {
    return async dispatch => {
        try {            
            const user = await loginService.login(userLogInfo)
            
            console.log(3);
            dispatch(setUser(user))
            dispatch(displayMessage('SUCCESS: login'))
            
            console.log(4);
            // set token
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            dispatch(resetLogin())
        } catch(error) {
            console.log(error)
            dispatch(displayMessage('ERROR: wrong credentials'))
        }
    }
}

export default userSlice.reducer
