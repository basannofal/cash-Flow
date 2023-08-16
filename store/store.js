import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/CategorySlice';
import memberReducer from './slices/MemberSlice';
import userReducer from './slices/UserSlice';
import paymentReducer from './slices/PaymentSlice';
import borrowReducer from './slices/BorrowSlice';



const store = configureStore({
  reducer: {
    category: categoryReducer,
    member : memberReducer,
    user : userReducer,
    payment : paymentReducer,
    borrow : borrowReducer,
  },
});

export default store;
