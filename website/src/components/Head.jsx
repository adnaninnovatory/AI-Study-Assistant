import React from 'react'

const Head = ({title,description}) => {
  return (
  
      <div className="flex flex-col items-start gap-2">
        <h1 className='text-[#2C3437] font-bold text-3xl'>{title}</h1>
        <p className='text-[#64748B] text-base'>{description}</p>
      </div>
  )
}

export default Head
