import React from 'react'

const FormField = ({id,label,value,type="text",onChange,as="input",placeholder,options=[]}:FormFieldProps) => {
  const InputToRender= ({type}: {type:string})=>{
    // below is choosing what to render base on the type of tag that the element is 
    if (type=== "textarea"){
      return <textarea id={id} name={id} value={value} onChange={onChange} />
    }else if (type==="select"){
      return <select id={id} name={id} value={value} onChange={onChange} >
        {options.map((option)=>(
          <option key={option.label} value={option.value}>{option.label}</option>
        ))}
        </select>
    } else{
      return <input id={id} name={id} value={value} onChange={onChange} />
    }
  }
  return (
    <div className="form-field">
      <label htmlFor={id}>{label} </label>
      <InputToRender type={as}/>
    </div>
  )
}

export default FormField
