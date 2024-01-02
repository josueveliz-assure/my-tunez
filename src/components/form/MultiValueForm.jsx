import { useState } from 'react';

const MultiValueForm = ({ label, values, onInput, isRequired = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddValue = () => {
    if (inputValue) {
      onInput([...values, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveValue = (valueToRemove) => {
    onInput(values.filter(value => value !== valueToRemove));
  };

  return (
    <div className='flex flex-col gap-2 mt-2'>
      <div className='space-x-2'>
        {' '}
        <label htmlFor=''>{label}</label>
        {isRequired && <span className='text-red-600'>*</span>}
      </div>
      <div >
        {values.map(value => (
          <div key={value} className='btn btn-sm mx-1'>
            {value}
            <button onClick={() => handleRemoveValue(value)} className="btn btn-xs btn-circle btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add members"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className='w-full h-11 rounded-md bg-gray-100 px-3 font-normal text-md border-none outline-1 outline-gray-400 transition text-gray-800'
      />
      <button onClick={handleAddValue} className='btn btn-outline w-16'>Add</button>
    </div>
  );
};

export default MultiValueForm;