import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/CategorySlice';
import memberReducer from './slices/MemberSlice';
import userReducer from './slices/UserSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    member : memberReducer,
    user : userReducer
  },
});

export default store;
