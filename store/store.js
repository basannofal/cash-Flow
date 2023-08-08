import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/CategorySlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export default store;
