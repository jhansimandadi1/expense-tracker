import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedId,
  setExpenseData,
} from '../../store/expenseSlice';
import { expenseTypeOptions } from "./constants"

const AddExpense = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ id: Date.now(), name: '', expenseType: "", expenseDate:new Date(), amount: '' });
  const { expenseData } = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  const { id : editId } = useParams();
  
  useEffect(() => {
    if (editId && editId !== null && editId !== "" && expenseData.length) {
      dispatch(setSelectedId(editId.toString()))
      setFormData(expenseData.find((item) => item.id.toString() === editId.toString()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, expenseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (formData) => {
    if (editId && editId !== null && editId !== "") {
      const updatedData = expenseData.map((item) =>
        item.id.toString() === editId.toString() ? formData : item
      );
      localStorage.setItem('expenseRecords', JSON.stringify(updatedData));
      dispatch(setExpenseData(updatedData));
      dispatch(setSelectedId(null));
    } else {
      localStorage.setItem('expenseRecords', JSON.stringify([...expenseData, formData]));
      dispatch(setExpenseData([...expenseData, formData]))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    navigate('/')
  };

  return (
    <>
    <div className='user-form'>
            <div className='heading'>
                <p>{editId && editId !== null && editId !== "" ? "Update " : "Add "} Expense</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="name" className="form-label">Name&nbsp;&nbsp;</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Expense name"
                      required
                    />
                </div>
                <div>
                    <label for="email" className="form-label">Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <select value={formData.expenseType} name="expenseType" onChange={handleChange} required>
                      <option value={""}> {"Select Expense Type"}</option>
                      {expenseTypeOptions.map((item) => (<option value={item.value}> {item.label}</option>))}
                    </select>
                </div>
                <div>
                    <label for="pwd" className="form-label">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input
                      type="date"
                      name="expenseDate"
                      value={formData.expenseDate}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className='m-b-20'>
                    <label for="pwd" className="form-label">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Expense Amount"
                      required
                    />
                  </div>
                <button type="submit" className="btn btn-primary ">{editId && editId !== null && editId !== "" ? "Update " : "Save "}</button>
            </form>
        </div>
    </>
  );
};

export default AddExpense;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   setSelectedId,
//   setExpenseData,
// } from '../../store/expenseSlice';
// import { inputsArray } from "./constants"
// import { Form } from "../Utilities/FormComponent"
// const AddExpense = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ id: Date.now(), name: '', expenseType: "", expenseDate:new Date(), amount: '' });
//   const { expenseData } = useSelector((state) => state.expense);
//   const dispatch = useDispatch();
//   const { id : editId } = useParams();
  
//   useEffect(() => {
//     if (editId && editId !== null && editId !== "" && expenseData.length) {
//       dispatch(setSelectedId(editId.toString()))
//       setFormData(expenseData.find((item) => item.id.toString() === editId.toString()));
//     }
//     console.log("***************************")
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [editId, expenseData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = (formData) => {
//     if (editId && editId !== null && editId !== "") {
//       const updatedData = expenseData.map((item) =>
//         item.id.toString() === editId.toString() ? formData : item
//       );
//       // localStorage.setItem('expenseRecords', JSON.stringify(updatedData));
//       dispatch(setExpenseData(updatedData));
//       dispatch(setSelectedId(null));
//     } else {
//       // localStorage.setItem('expenseRecords', JSON.stringify([...expenseData, formData]));
//       dispatch(setExpenseData([...expenseData, formData]))
//     }
//   };

//   const handleSubmit = (e) => {
//     // e.preventDefault();
//     handleSave(formData);
//     navigate('/')
//   };

//   return (
//     <>
//     <div className='user-form'>
//             <div className='heading'>
//                 <p>{editId && editId !== null && editId !== "" ? "Update " : "Add "} Expense</p>
//             </div>
//             {/* <form onSubmit={handleSubmit}> */}
//               <Form fromInputs={inputsArray} formData={formData} setFormData={setFormData} onSubmitForm={handleSubmit} buttonName={editId && editId !== null && editId !== "" ? "Update " : "Save "}/>
//                 {/* <div>
//                     <label for="name" className="form-label">Name&nbsp;&nbsp;</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Expense name"
//                       required
//                     />
//                 </div>
//                 <div>
//                     <label for="email" className="form-label">Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
//                     <select value={formData.expenseType} name="expenseType" onChange={handleChange} required>
//                       <option value={""}> {"Select Expense Type"}</option>
//                       {expenseTypeOptions.map((item) => (<option value={item.value}> {item.label}</option>))}
//                     </select>
//                 </div>
//                 <div>
//                     <label for="pwd" className="form-label">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
//                     <input
//                       type="date"
//                       name="expenseDate"
//                       value={formData.expenseDate}
//                       onChange={handleChange}
//                       required
//                     />
//                 </div>
//                 <div className='m-b-20'>
//                     <label for="pwd" className="form-label">Amount</label>
//                     <input
//                       type="number"
//                       name="amount"
//                       value={formData.amount}
//                       onChange={handleChange}
//                       placeholder="Expense Amount"
//                       required
//                     />
//                   </div> */}
//                 {/* <button type="submit" className="btn btn-primary ">{editId && editId !== null && editId !== "" ? "Update " : "Save "}</button> */}
//             {/* </form> */}
//         </div>
//     </>
//   );
// };

// export default AddExpense;