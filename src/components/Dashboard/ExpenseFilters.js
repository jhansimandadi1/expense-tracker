import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
  setExpenseFilterData,
} from '../../store/expenseSlice';
import {useDispatch} from 'react-redux';
import {monthsOptions, expenseTypeOptions} from './constants';

export const ExpenseFilters = () => {
  const [filterData, setFilterData] = useState({
    selectedMonth: '',
    selectedYear: '',
    selectedType: '',
  });
  const dispatch = useDispatch ();
  const currentYear = new Date ().getFullYear();
  const startYear = currentYear - 3;
  const endYear = currentYear + 3;
  const yearOptions = [];

  useEffect(() => {
    for (let year = startYear; year <= endYear; year++) {
      yearOptions.push ({value: year, label: year});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleChange = e => {
    const {name, value} = e.target;
    console.log(isNaN(value))
    const obj = {...filterData, [name]: isNaN(value) ? value : Number(value)}
    setFilterData(obj);
    dispatch(setExpenseFilterData (obj));
  };

  return (
    <div>
      <div className="float-left">
        <label><b>Filter By : </b></label>
        <select
          value={filterData.selectedYear}
          name="selectedYear"
          onChange={handleChange}
          required
        >
          <option value={''}> {'Select Year'}</option>
          {yearOptions.map (item => (
            <option value={item.value}> {item.label}</option>
          ))}
        </select>
        <select
          value={filterData.selectedMonth}
          name="selectedMonth"
          onChange={handleChange}
          required
        >
          <option value={''}> {'Select Month'}</option>
          {monthsOptions.map (item => (
            <option value={item.value}> {item.label}</option>
          ))}
        </select>
        <select
          value={filterData.selectedType}
          name="selectedType"
          onChange={handleChange}
          required
        >
          <option value={''}> {'Select Type'}</option>
          {expenseTypeOptions.map (item => (
            <option value={item.value}> {item.label}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary float-right m-b-10">
        <Link className="nav-link" to="expense">
          Add Expense
        </Link>
      </button>
    </div>
  );
};
