import React, { useState,useEffect } from 'react'

const Input = ({ onUpdate, ...prop }) => {
  const [value,setValue] = useState(prop.value ? prop.value : "");
  const handleChange = e => {
    setValue(e.target.value)
  }
  useEffect(()=>{    
    if(onUpdate){
      onUpdate(value)
    }
  },[value])
  return  <input value={value} onChange={handleChange} {...prop}/>
}

export default Input
