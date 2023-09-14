import React from 'react'

const Input = ({type,name,value,className,placeholder,onChange}) => {
  return (
    <div><input type={type} name={name} value={value} className={className} placeholder={placeholder} onChange={onChange} /></div>
  )
}

export default Input