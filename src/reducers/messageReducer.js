import { createSlice } from '@reduxjs/toolkit'

const initialState = {text: "", timeoutID: null, success: true}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action) {
            clearTimeout(state.timeoutID)
            return action.payload
        },
        deleteMessage(state, action) {
            return initialState
        }
    }
})

const { setMessage, deleteMessage } = messageSlice.actions

export const displayMessage = (success, text) => {
    return (dispatch) => {
        const timeoutID = setTimeout(() => {
            dispatch(deleteMessage())
        }, 3000)

        dispatch(setMessage({ text, timeoutID, success }))
    }
}

export default messageSlice.reducer