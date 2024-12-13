import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
    setSelectedId,
    setExpenseData,
    setExpenseFilterData
  } from '../store/expenseSlice';
import { useSelector, useDispatch } from 'react-redux';
import { monthsOptions, expenseTypeOptions } from "./constants"
import "./Dashboard.css";

const Dashboard = () => {
    const { expenseData, expenseFilterObj } = useSelector((state) => state.expense);
    const [filterData, setFilterData] = useState({selectedMonth: "", selectedYear: "", selectedType: ""});
    const [tableRecords, setTableRecords] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3; 
    const endYear = currentYear + 3; 
  
    const yearOptions = [];
    for (let year = startYear; year <= endYear; year++) {
        yearOptions.push({ value: year, label: year });
    }

    useEffect(() => {
        if (Object.entries(expenseFilterObj).every(([key, value]) => value === "" || value === null || value === undefined)) 
            setTableRecords(expenseData.filter((item) => new Date(item.expenseDate).getMonth() === new Date().getMonth()));
        else {
            setFilterData(expenseFilterObj)
            const records = expenseData.filter((item) => {
                if(expenseFilterObj.selectedType && !expenseFilterObj.selectedMonth && !expenseFilterObj.selectedYear)
                    return item.expenseType === expenseFilterObj.selectedType;
                else if(!expenseFilterObj.selectedType && expenseFilterObj.selectedMonth && !expenseFilterObj.selectedYear)
                    return new Date(item.expenseDate).getMonth() + 1 === Number(expenseFilterObj.selectedMonth);
                else if(!expenseFilterObj.selectedType && !expenseFilterObj.selectedMonth && expenseFilterObj.selectedYear)
                    return new Date(item.expenseDate).getFullYear() === Number(expenseFilterObj.selectedYear);
                else if(!expenseFilterObj.selectedType && expenseFilterObj.selectedMonth && expenseFilterObj.selectedYear)
                    return new Date(item.expenseDate).getFullYear() === Number(expenseFilterObj.selectedYear) && new Date(item.expenseDate).getMonth() + 1 === Number(expenseFilterObj.selectedMonth) ;
                else if(expenseFilterObj.selectedType && !expenseFilterObj.selectedMonth && expenseFilterObj.selectedYear)
                    return item.expenseType === expenseFilterObj.selectedType && new Date(item.expenseDate).getFullYear() === Number(expenseFilterObj.selectedYear);
                else if(expenseFilterObj.selectedType && expenseFilterObj.selectedMonth && !expenseFilterObj.selectedYear)
                    return item.expenseType === expenseFilterObj.selectedType && new Date(item.expenseDate).getMonth() + 1 === Number(expenseFilterObj.selectedMonth);
                else return item.expenseType === expenseFilterObj.selectedType && new Date(item.expenseDate).getFullYear() === Number(expenseFilterObj.selectedYear) && new Date(item.expenseDate).getMonth() + 1 === Number(expenseFilterObj.selectedMonth) ;
            });
            setTableRecords(records)
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [expenseFilterObj, expenseData]);

  
    const handleEdit = (id) => {
        dispatch(setSelectedId(id))
        navigate(`/expense/${id}`)
    };
  
    const handleDelete = (id) => {
      const updatedData = tableRecords.filter((item) => item.id !== id);
      localStorage.setItem('expenseRecords', JSON.stringify(updatedData));
      dispatch(setExpenseData(updatedData));
    }; 

    const totalExpenses = useMemo(
        () => tableRecords.reduce((result, item) => {
            return result + Number(item.amount);
          }, 0),
        [tableRecords]
      );

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData({ ...filterData, [name]: value });
        dispatch(setExpenseFilterData({ ...filterData, [name]: value }));
      };

      return (
        <>
            <h1 className='m-b-20'>Expense Tracker  {expenseData.length > 0 && "- Total expense amount: $" + totalExpenses}</h1>  
            <div>
                <div className='float-left'>
                <label><b>Filter By : </b></label>
                <select value={filterData.selectedYear} name="selectedYear" onChange={handleChange} required>
                    <option value={""}> {"Select Year"}</option>
                    {yearOptions.map((item) => (<option value={item.value}> {item.label}</option>))}
                </select>
                <select value={filterData.selectedMonth} name="selectedMonth" onChange={handleChange} required>
                    <option value={""}> {"Select Month"}</option>
                    {monthsOptions.map((item) => (<option value={item.value}> {item.label}</option>))}
                </select>
                <select value={filterData.selectedType} name="selectedType" onChange={handleChange} required>
                    <option value={""}> {"Select Type"}</option>
                    {expenseTypeOptions.map((item) => (<option value={item.value}> {item.label}</option>))}
                </select>
                </div>
                <button type="submit" className="btn btn-primary float-right m-b-10">
                    <Link className="nav-link" to="expense">
                        Add Expense
                    </Link>
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Expense Name</th>
                    <th>Expense Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {tableRecords.length> 0 && tableRecords.map((item, index) => (
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.expenseType}</td>
                    <td>{item.expenseDate}</td>
                    <td>{item.amount}</td>
                    <td>
                        <button onClick={() => handleEdit(item.id)}>Edit</button>
                        <button className="m-l-10" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
  };

export default Dashboard;