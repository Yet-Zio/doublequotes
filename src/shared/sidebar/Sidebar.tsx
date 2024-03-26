import React from 'react'
import SideOption from './SideOption'

export default function Sidebar() {
  return (
    <div className='hidden md:flex flex-col min-h-screen w-[255px] border-e border-e-[#3c3e39] p-[16px] space-y-2'>
        <SideOption option="Home"/>
        <SideOption option="Trending"/>
    </div>
  )
}
