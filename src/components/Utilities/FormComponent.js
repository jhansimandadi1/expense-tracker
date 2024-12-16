import React, {useState, useCallback} from 'react';
import debounce from 'lodash.debounce';

const Form = ({fromInputs, formData, onSubmitForm, buttonName, setFormData}) => {

    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name, value,">>>>>>>>>>>>>>>>>>>>>>>>>")
      setFormData({...formData, [name]: value})
      // setFormValues({ ...formValues, [name]: value });
    };


    const InputTag = ({input}) => {
        return <input
        type={input?.type}
        name={input?.name}
        value={formData[input?.name]}
        onChange={handleChange}
        placeholder={input?.placeholder}
        required={input?.required}
      />
    }

    const SelectTag = ({input}) => {
        return <select
        name={input?.name}
        value={formData[input?.name]}
        onChange={handleChange}
        placeholder={input?.placeholder}
        required={input?.required}
      >
         <option value={""}> {input?.placeholder}</option>
         {input?.options?.map((item) => (<option value={item.value}> {item.label}</option>))}
      </select>
    }

    const handleSubmit = (e) => {
       onSubmitForm(formData);
      };
    
 
    return (
        <>
            <form onSubmit={handleSubmit}>
                {fromInputs?.length && fromInputs.map(item =>{
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
