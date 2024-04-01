import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TextField = ({ label, placeholder, icon, type, onChange, hasError, errorMessage }) => {
  return (
    <div className='p-5'>
      <p className='text-sm mb-3 font-bold'>{label}</p>
      <div className='flex flex-row gap-x-4'>
        {icon && <FontAwesomeIcon icon={icon} className="text-teal-500 text-lg" />}
        <input 
          type={type} 
          placeholder={placeholder} 
          className='border-b border-blue-100 outline-none text-sm w-full'
          onChange={onChange}
        />
      </div>
      {hasError && <p className='text-xs text-red-600 ml-8 mt-1'>{errorMessage}</p>}
    </div>
  );
};

export default TextField;
