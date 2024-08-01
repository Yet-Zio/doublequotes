import { Quotes, MagnifyingGlass, DotsThree, SignIn, Question, Storefront} from '@phosphor-icons/react'
import { AnimatePresence, motion} from 'framer-motion';
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef<HTMLButtonElement | null>(null)
  const [authDrop, setAuthDrop] = useState(false)

  const dropVariants = {
    hidden: { 
        y: -10,
        opacity: 0, 
        transition: {
            duration: 0.2,
        }
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
        }
    },
  }

  useEffect(() => {
    function handleClickOutside(event: { target: any; }){
      if(dropRef.current && !dropRef.current.contains(event.target)){
        setAuthDrop(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <nav className="flex w-full items-center ps-3 bg-[#0c0d0c]">
      <div className="flex items-center">
        <Quotes size={40} className='text-[#A9A74F] hover:cursor-pointer' weight='bold' onClick={() => {window.location.href = "/"}}/>
        <span className='text-2xl text-white usedbquotes ms-2 hover:cursor-pointer select-none hidden md:flex' onClick={() => {window.location.href = "/"}}>Double<span className='text-[#A9A74F]'>Quotes</span></span>
      </div>
      {window.location.pathname !== "/login" ? (
      <>
      <div className="flex w-full justify-start ms-3 md:justify-center md:ms-0">
        <div onClick={() => {inputRef.current?.focus()}} className="flex justify-center pt-2 pb-2 ps-5 pe-7 rounded-2xl bg-[#1f211d] text-gray-400 outline-0 border-0 hover:bg-[#1f211d]/75 items-center">
          <MagnifyingGlass size={20} onClick={() => {inputRef.current?.focus()}}/>
          <input ref={inputRef} type='text' placeholder='Search DoubleQuotes...' className='useinter ms-2 w-[50px] md:w-[200px] lg:w-[546px] bg-transparent outline-0 border-0'></input>
        </div>
      </div>
      <div className="flex relative">
        <button className='flex justify-center items-center h-10 pt-5 pb-5 ps-3 pe-3 bg-[#A9A74F] rounded-full useinter text-sm hover:bg-[#A9A74F]/75' onClick={() => {window.location.href = "/login"}}>Log&nbsp;In</button>
        <button ref={dropRef} className='font-bold ms-2 flex justify-center items-center h-10 w-10 bg-[#0c0d0c] rounded-full useinter text-sm hover:bg-[#1f211d]' onClick={() => setAuthDrop(!authDrop)}><DotsThree size={28}/></button>
        <AnimatePresence>
          {authDrop && (
            <motion.div
              variants={dropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className='absolute flex flex-col mt-12 right-0 w-[256px] h-[157px] z-30 bg-[#1a1e15] rounded-xl useinter'
            >
              <div className="flex mt-2 w-full items-center hover:bg-[#242a1d] pt-3 pb-3 cursor-pointer select-none" onClick={() => window.location.href = "/login"}>
                <SignIn size={20} className='ms-5 me-2'/>
                <span className='text-sm'>Login / Signup</span>
              </div>
              <div className="flex mt-2 w-full items-center hover:bg-[#242a1d] pt-3 pb-3 cursor-pointer select-none" onClick={() => window.location.href = "/itemshop"}>
                <Storefront size={20} className='ms-5 me-2'/>
                <span className='text-sm'>Item Shop</span>
              </div>
              <div className="flex mt-2 w-full items-center hover:bg-[#242a1d] rounded-b-xl pt-3 pb-3 cursor-pointer select-none" onClick={() => window.location.href = "/help"}>
                <Question size={20} className='ms-5 me-2'/>
                <span className='text-sm'>Help</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </>
      ) : (
        ""
      )}
      
    </nav>
  )
}
