import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';

const combinedReducer = configureStore({
  reducer: {
    expense: expenseReducer,
  },
});

export default combinedReducer;