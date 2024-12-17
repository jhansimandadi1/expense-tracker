import React, {useState} from 'react';

const Form = ({formInputs, formData, onSubmitForm, buttonName, setFormData}) => {
    const [inputData, setInputData] = useState({...formData})
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInputData({...inputData, [name]: value})
    };

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
        setFormData(inputData)
        onSubmitForm(inputData);
    };
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                {formInputs?.length && formInputs.map(item =>{
                return <>
                        <div>{item.tag === 'input' ? <InputTag input={item}/> : item.tag === 'select' ? <SelectTag input={item}/>:<></>}</div> 
                    </>
                })}
                <button type="submit" className="btn btn-primary ">{buttonName}</button>
            </form>
        </>
  );
};

export { Form }
