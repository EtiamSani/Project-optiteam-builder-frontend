import React from 'react'
import { Input } from '../../ui/input'

const SearchBar = () => {
  return (
    <div className='w-[390px] mb-8 relative'>
        <Input type="email" placeholder="Trouver un employé" />
        <span className="absolute inset-y-0 right-5 pl-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M15.293 14.293a1 1 0 01-1.414 1.414l-3.4-3.4a5 5 0 10-1.414 1.414l3.4 3.4a1 1 0 101.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  )
}

export default SearchBar