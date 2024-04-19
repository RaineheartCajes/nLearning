import { configureStore } from '@reduxjs/toolkit'
import  CounterReducer from './counter'
import todoReducer from './todo'

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    todo: todoReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch