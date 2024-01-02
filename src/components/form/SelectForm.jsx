const SelectForm = ({
  label,
  value,
  onInput,
  isRequired = false,
  options = []
}) => {
  return (
    <div className='flex flex-col gap-2 mt-2'>
      <div className='space-x-2'>
        {' '}
        <label htmlFor=''>{label}</label>
        {isRequired && <span className='text-red-600'>*</span>}
      </div>
      <select
        value={value}
        required={isRequired}
        onChange={(event) => onInput(event.target.value)}
        className='w-full h-11 rounded-md bg-gray-100 px-3 font-normal text-md border-none outline-1 outline-gray-400 transition text-gray-800'
      >
        <option value=''>Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectForm;