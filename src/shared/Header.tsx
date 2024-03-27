import Navbar from './Navbar'

export default function Header() {
  // fg #A9A74F
  // bg #31352E
  return (
    <>
    <div className="flex flex-col sticky w-full z-10 top-0 left-0 bg-[#1f211d] ps-2 pe-2">
      <div className='flex h-14 bg-[#1f211d]'>
        <Navbar/>
      </div>
      <hr className='border-0 h-[1px] bg-[#3c3e39]'/>
    </div>
    </>
  )
}
