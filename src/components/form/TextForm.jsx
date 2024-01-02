const TextForm = ({
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
        type='text'
        value={value}
        required={isRequired}
        placeholder={label}
        onChange={(event) => onInput(event.target.value)}
        className='w-full h-11 rounded-md bg-gray-100 px-3 font-normal text-md border-none outline-1 outline-gray-400 transition text-gray-800'
      />
    </div>
  )
}

export default TextForm;