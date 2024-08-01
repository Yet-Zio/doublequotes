import { useDQSelector } from '../redux/hooks'
import Navbar from './Navbar'

export default function Header() {
  // fg #A9A74F
  // bg #31352E

  const showHeader  = useDQSelector(state => state.header.headerShown)
  return (
    <>
    {showHeader && (
      <div className="flex flex-col sticky min-w-screen z-10 top-0 left-0 bg-[#0c0d0c] ps-2 pe-2">
        <div className='flex h-14 bg-[#0c0d0c]'>
          <Navbar/>
        </div>
      <hr className='border-0 h-[1px] bg-[#3c3e39]'/>
      </div>
    )}
    </>
  )
}
