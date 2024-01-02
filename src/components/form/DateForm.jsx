const DateForm = ({
  label,
  value,
  onInput,
  isRequired = false
}) => {
  return (
    <div className='flex flex-col gap-2 mt-2'>
      <div className='space-x-2'>
        {' '}
        <label htmlFor=''>{label}</label>
        {isRequired && <span className='text-red-600'>*</span>}
      </div>

      <input
        value={value}
        onChange={event => onInput(event.target.value)}
        type='month'
        placeholder={label}
        required={isRequired}
        className='w-full h-11 rounded-md bg-gray-100 px-5 font-normal text-md border-none outline-1 outline-gray-400 transition text-gray-800'
      />
    </div>
  )
}

export default DateForm;