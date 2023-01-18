import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    },
})

export const initUsers = () => {
    return async dispatch => {
        const blogs = await userService.getAll()
        dispatch(usersSlice.actions.setUsers(blogs))
    }
}

export default usersSlice.reducer
