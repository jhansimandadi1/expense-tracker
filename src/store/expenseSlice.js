import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedId: null,
  expenseData: JSON.parse(localStorage.getItem('expenseRecords')) || [],
  selectedDate: new Date(),
  expenseFilterObj: {
    selectedMonth: "",
    selectedYear: "",
    selectedType: ""
  }
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
      setSelectedId: (state, action) => {
        state.selectedId = action.payload;
      },
      setExpenseData: (state, action) => {
        state.expenseData =  action.payload;
      },
      setExpenseFilterData: (state, action) => {
        state.expenseFilterObj =  action.payload;
      }
  },
});
export const { setSelectedId, setExpenseData, setExpenseFilterData } = expenseSlice.actions;

export default expenseSlice.reducer;