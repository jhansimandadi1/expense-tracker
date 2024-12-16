import React, {useState, useCallback} from 'react';

const Form = ({formInputs, formData, onSubmitForm, buttonName, setFormData}) => {
   const [inputData, setInputData] = useState({ id: Date.now(), name: '', expenseType: "", expenseDate:new Date(), amount: '' })
const [inputList] = useState(formInputs) 

console.log(inputList,formInputs,">>>>>>>>>>>>")
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name, value,">>>>>>>>>>>>>>>>>>>>>>>>>")
      setInputData({...inputData, [name]: value})
      // setFormValues({ ...formValues, [name]: value });
    };

    const handleChangeInput = (e) =>{
      const { name, value } = e.target;

      console.log(name, value,">>>>>>>>>>>>>>")
    }

    const InputTag = ({input}) => {
        return <input
        type={input?.type}
        name={input?.name}
        value={inputData[input?.name]}
        onChange={handleChange}
        placeholder={input?.placeholder}
        required={input?.required}
      />
    }

    const SelectTag = ({input}) => {
        return <select
        name={input?.name}
        value={inputData[input?.name]}
        onChange={handleChange}
        placeholder={input?.placeholder}
        required={input?.required}
      >
         <option value={""}> {input?.placeholder}</option>
         {input?.options?.map((item) => (<option value={item.value}> {item.label}</option>))}
      </select>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       onSubmitForm(inputData);
      };
    
      const expenseTypeOptions = [
        { value: 'Housing', label: 'Housing' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Health-Care', label: 'Health-Care' },
        { value: 'Child-Care', label: 'Child-Care' },
        { value: 'Emergency-Fund', label: 'Emergency-Fund' },
      ];
 
    return (
        <>
            <form onSubmit={handleSubmit}>
                {inputList?.length && inputList.map(item =>{
                return <>
                        <div>{item.tag === 'input' ? <InputTag input={item}/> : item.tag === 'select' ? <SelectTag input={item}/>:<></>}</div> 
                    </>
                })}
                <button type="submit" className="btn btn-primary ">{buttonName}</button>
            </form>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="name" className="form-label">Name&nbsp;&nbsp;</label>
                    <input
                      type="text"
                      name="name"
                      value={inputData.name}
                      onChange={handleChange}
                      placeholder="Expense name"
                      required
                    />
                </div>
                <div>
                    <label for="email" className="form-label">Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <select value={inputData.expenseType} name="expenseType" onChange={handleChange} required>
                      <option value={""}> {"Select Expense Type"}</option>
                      {expenseTypeOptions.map((item) => (<option value={item.value}> {item.label}</option>))}
                    </select>
                </div>
                <div>
                    <label for="pwd" className="form-label">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input
                      type="date"
                      name="expenseDate"
                      value={inputData.expenseDate}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className='m-b-20'>
                    <label for="pwd" className="form-label">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={inputData.amount}
                      onChange={handleChange}
                      placeholder="Expense Amount"
                      required
                    />
                  </div>
                <button type="submit" className="btn btn-primary ">"Save "</button>
            </form>
        </>
  );
};

export { Form }
