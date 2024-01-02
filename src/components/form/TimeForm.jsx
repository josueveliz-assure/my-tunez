import { useState, useEffect } from 'react';

const TimeForm = ({
  label,
  value,
  onInput,
  isRequired = false
}) => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    if (value) {
      const parts = value.split(':');
      setMinutes(parts[0]);
      setSeconds(parts[1]);
    }
  }, [value]);

  const handleMinutesChange = (event) => {
    let newValue = event.target.value;
    if (newValue < 0) {
      newValue = 0;
    }
    setMinutes(newValue);
    onInput(`${newValue}:${seconds}`);
  };

  const handleSecondsChange = (event) => {
    let newValue = event.target.value;
    if (newValue < 0) {
      newValue = 0;
    }
    if (newValue > 59) {
      newValue = 59;
    }
    setSeconds(newValue);
    onInput(`${minutes}:${newValue}`);
  };

  return (
    <div className='flex flex-col gap-2 mt-2'>
      <div className='space-x-2'>
        {' '}
        <label htmlFor=''>{label}</label>
        {isRequired && <span className='text-red-600'>*</span>}
      </div>

      <div>
        <input
          value={minutes}
          onChange={handleMinutesChange}
          type='number'
          placeholder='mm'
          required={isRequired}
          className='w-20 h-11 rounded-md bg-gray-100 px-5 font-normal text-sm border-none outline-1 outline-gray-400 transition text-gray-800'
        />
        <span>:</span>
        <input
          value={seconds}
          onChange={handleSecondsChange}
          type='number'
          placeholder='ss'
          required={isRequired}
          className='w-20 h-11 rounded-md bg-gray-100 px-5 font-normal text-sm border-none outline-1 outline-gray-400 transition text-gray-800'
        />
      </div>
    </div>
  )
}

export default TimeForm;