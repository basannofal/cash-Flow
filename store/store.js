import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/CategorySlice';
import memberReducer from './slices/MemberSlice';
import userReducer from './slices/UserSlice';
import paymentReducer from './slices/PaymentSlice';
import borrowReducer from './slices/BorrowSlice';
import errorReducer from './slices/ErrorSlice';
import memberBorrowDepositeSliceReducer from './slices/MemberBorrowDepositeSlice';
import returnPaymentReducer from './slices/ReturnPaymentSlice';
import AccountingReducer from './slices/Accounting';





const store = configureStore({
  reducer: {
    category: categoryReducer,
    member : memberReducer,
    user : userReducer,
    payment : paymentReducer,
    borrow : borrowReducer,
    error : errorReducer,
    borrowdeposite : memberBorrowDepositeSliceReducer,
    returnpayment : returnPaymentReducer,
    account : AccountingReducer,
  },
});

export default store;
