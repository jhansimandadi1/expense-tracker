import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    setSelectedId,
    setExpenseData,
  } from '../../store/expenseSlice';
import { useSelector, useDispatch } from 'react-redux';
import {ExpenseFilters} from './ExpenseFilters'
import {tableColumns, title} from './constants';

import "./Dashboard.css";

const Dashboard = () => {
    const { expenseData, expenseFilterObj } = useSelector((state) => state.expense);
    const [tableRecords, setTableRecords] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dateFilter = (type, date) => {
        return type === 'month' ? new Date(date ? date : new Date())?.getMonth() : new Date(date ? date : new Date())?.getFullYear()
    }


    useEffect(() => {
            const records = expenseData.filter((item) => {
                return expenseFilterObj.selectedType && !expenseFilterObj.selectedMonth && !expenseFilterObj.selectedYear ? item.expenseType === expenseFilterObj.selectedType :
                !expenseFilterObj.selectedType && expenseFilterObj.selectedMonth && !expenseFilterObj.selectedYear ? dateFilter('month', item?.expenseDate) + 1 === expenseFilterObj.selectedMonth :
                !expenseFilterObj.selectedType && !expenseFilterObj.selectedMonth && expenseFilterObj.selectedYear ? dateFilter('year', item?.expenseDate) === expenseFilterObj.selectedYear :
                !expenseFilterObj.selectedType && expenseFilterObj.selectedMonth && expenseFilterObj.selectedYear ? dateFilter('year', item?.expenseDate) === expenseFilterObj.selectedYear && dateFilter('month', item?.expenseDate) + 1 === expenseFilterObj.selectedMonth :
                expenseFilterObj.selectedType && !expenseFilterObj.selectedMonth && expenseFilterObj.selectedYear ? item.expenseType === expenseFilterObj.selectedType && dateFilter('year', item?.expenseDate) === expenseFilterObj.selectedYear :
                expenseFilterObj.selectedType && expenseFilterObj.selectedMonth && !expenseFilterObj.selectedYear ? item.expenseType === expenseFilterObj.selectedType && dateFilter('month', item?.expenseDate) + 1 === expenseFilterObj.selectedMonth : 
                expenseFilterObj.selectedType && expenseFilterObj.selectedMonth && expenseFilterObj.selectedYear ? item.expenseType === expenseFilterObj.selectedType && dateFilter('year', item?.expenseDate) === expenseFilterObj.selectedYear && dateFilter('month', item?.expenseDate) + 1 === expenseFilterObj.selectedMonth : dateFilter('month', item?.expenseDate) === dateFilter('month')
            });
            setTableRecords(records)
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

      return (
        <>
            <h1 className='m-b-20'>{title + totalExpenses}</h1>  
            <ExpenseFilters/>
            <table>
                <thead>
                <tr>
                    <th>S.No</th>
                    {tableColumns.map((col) => ( <th>{col.name}</th>))}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {tableRecords.length ? tableRecords.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {tableColumns.map((col) => ( <td>{item[col.key]}</td>))}
                        <td>
                            <button onClick={() => handleEdit(item.id)}>Edit</button>
                            <button className="m-l-10" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                )) :<></>}
                </tbody>
            </table>
        </>
    );
  };

export default Dashboard;