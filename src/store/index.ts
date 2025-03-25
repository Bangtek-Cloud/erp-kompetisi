import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './feature/counterSlice'
import authReducer from './feature/authSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;