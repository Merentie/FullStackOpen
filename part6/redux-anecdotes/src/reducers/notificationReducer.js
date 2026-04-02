import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        putNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})

const { putNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async (dispatch) => {
        dispatch(putNotification(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time*1000)
    }
}

export default notificationSlice.reducer