import React from "react";

const Search = () => {
  return (
    <div className='relative w-[340px] ml-10 mr-5'>
      <svg className="absolute top-[15px] right-4 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <input type='text' className='w-full h-11 rounded-md bg-gray-100 px-5 text-base border-none outline-1 outline-gray-400 transition' placeholder='Search'/>
    </div>
  );
};

export default Search;