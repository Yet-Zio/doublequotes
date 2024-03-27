import { Quotes, MagnifyingGlass, DotsThree} from '@phosphor-icons/react'
import { useRef } from 'react'

export default function Navbar() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <nav className="flex w-full items-center ps-3 bg-[#1f211d]">
      <div className="flex items-center">
        <Quotes size={40} className='text-[#A9A74F] hover:cursor-pointer' weight='bold' onClick={() => {window.location.href = "/"}}/>
        <span className='text-2xl text-white usedbquotes ms-2 hover:cursor-pointer select-none hidden md:flex' onClick={() => {window.location.href = "/"}}>Double<span className='text-[#A9A74F]'>Quotes</span></span>
      </div>
      <div className="flex w-full justify-start ms-3 md:justify-center md:ms-0">
        <div onClick={() => {inputRef.current?.focus()}} className="flex justify-center pt-2 pb-2 ps-5 pe-7 rounded-2xl bg-slate-700/50 text-gray-400 outline-0 border-0 hover:bg-slate-700/25 items-center">
          <MagnifyingGlass size={20} onClick={() => {inputRef.current?.focus()}}/>
          <input ref={inputRef} type='text' placeholder='Search DoubleQuotes...' className='useinter ms-2 w-[50px] md:w-[200px] lg:w-[546px] bg-transparent outline-0 border-0'></input>
        </div>
      </div>
      <div className="flex">
        <button className='flex justify-center items-center h-10 pt-5 pb-5 ps-3 pe-3 bg-[#A9A74F] rounded-full useinter text-sm hover:bg-[#A9A74F]/75'>Log&nbsp;In</button>
        <button className='font-bold ms-2 flex justify-center items-center h-10 w-10 bg-[#1f211d] rounded-full useinter text-sm hover:bg-[#3c3e39]'><DotsThree size={28}/></button>
      </div>
    </nav>
  )
}
