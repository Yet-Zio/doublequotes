import { Quotes, MagnifyingGlass} from '@phosphor-icons/react'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex w-full items-center ps-3 bg-[#1f211d]">
      <div className="flex items-center">
        <Quotes size={40} className='text-[#A9A74F] hover:cursor-pointer' weight='bold'/>
        <span className='text-2xl text-white usedbquotes ms-2 hover:cursor-pointer select-none'>Double<span className='text-[#A9A74F]'>Quotes</span></span>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex justify-center pt-2 pb-2 ps-5 pe-7 rounded-2xl bg-slate-700/75 text-gray-400 outline-0 border-0 hover:bg-slate-700/50 items-center">
          <MagnifyingGlass size={20}/>
          <input type='text' placeholder='Search DoubleQuotes' className='ms-2 bg-transparent outline-0 border-0'></input>
        </div>
      </div>
    </nav>
  )
}
