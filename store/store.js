import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/CategorySlice';
import memberReducer from './slices/MemberSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    member : memberReducer
  },
});

export default store;
