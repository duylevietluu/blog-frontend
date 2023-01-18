import { createSlice } from '@reduxjs/toolkit'

const initialState = { username: '', password: '' }

const loginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        setUsername(state, action) {
            return {...state, username: action.payload}
        },
        setPassword(state, action) {
            return {...state, password: action.payload}
        },
        resetLogin(state, action) {
            return initialState
        }
    }
})

export const { setUsername, setPassword, resetLogin } = loginFormSlice.actions

export default loginFormSlice.reducer