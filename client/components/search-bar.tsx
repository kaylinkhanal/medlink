import React from 'react'
import { Input } from './ui/input'

const SearchBar = () => {
  return (
  <div className="absolute top-3 left-30 z-1000 bg-white"> 
           <Input  placeholder='Search...'/>
        </div>
  )
}

export default SearchBar