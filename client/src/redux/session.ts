import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  token: string | null;
  username: string | null; 
  isLoading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  token: null,
  username: null, 
  isLoading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ token: string; username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username; 
    },
    clearSession(state) {
      state.token = null;
      state.username = null; 
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  }
});

export const { setSession, clearSession, setError, setLoading } = sessionSlice.actions;
export default sessionSlice.reducer;