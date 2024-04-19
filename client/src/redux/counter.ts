import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterReducer {
    value: number
}

const initialState: CounterReducer = {
    value: 0,
}

  export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        
        state.value += 1
      },
      decrement: (state) => {
        if (state.value > 0) {
          state.value -= 1
        }
        else {
          state.value = 0
        }
        
      },
      incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload
      },
      decrementByAmount: (state, action: PayloadAction<number>) => {
        state.value -= action.payload
      }
    },
  })


export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions

export default counterSlice.reducer