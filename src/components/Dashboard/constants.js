export const title = "Expense Tracker - Total expense amount: $"
export const monthsOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];
  
  export const expenseTypeOptions = [
    { value: 'Housing', label: 'Housing' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Health-Care', label: 'Health-Care' },
    { value: 'Child-Care', label: 'Child-Care' },
    { value: 'Emergency-Fund', label: 'Emergency-Fund' },
  ];

  export const tableColumns = [
    { name:"Expense Name", key:"name" },
    { name:"Expense Type", key:"expenseType" },
    { name:"Date", key:"expenseDate" },
    { name:"Amount", key:"amount" },
  ]