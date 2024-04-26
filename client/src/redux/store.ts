import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './counter';
import sessionReducer from './session'; 

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    session: sessionReducer 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;