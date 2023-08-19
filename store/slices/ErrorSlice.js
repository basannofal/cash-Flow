// redux/slices/ErrorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: '',
};
const ErrorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
});


export const { setError, clearError } = ErrorSlice.actions;
export default ErrorSlice.reducer;
