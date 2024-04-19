import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  isLoading: boolean;
  data: Todo[] | null;
  error: string | null;
}

const initialState: TodoState = {
  isLoading: false,
  data: null,
  error: null
};

export const getTodos = createAsyncThunk(
  'todo/getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Todo[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getTodos.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload;
      });
  }
});

export default todoSlice.reducer;
