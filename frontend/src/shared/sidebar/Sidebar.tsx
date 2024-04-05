import SideOption from './SideOption'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import SideTopics from './SideTopics';
import SideRes from './SideRes';

export default function Sidebar() {
  return (
    <>
    <div className='dummyside hidden lg:flex flex-col min-h-screen w-[255px] p-[16px] me-14'>
      <div className={`dummydiv flex w-[202px] h-10 items-center rounded-xl ps-3 cursor-pointer mb-3`}>
      </div>
    </div>
    <SimpleBar className='hidden lg:flex flex-col min-h-screen w-[255px] bg-[#0c0d0c] border-e border-e-[#3c3e39] p-[16px] fixed' forceVisible="y" autoHide={true} style={{height: "100vh"}}>
        <div className="flex flex-col me-5 mb-5">
          <SideOption option="Home"/>
          <SideOption option="Trending"/>
        </div>
        <SideTopics/>
        <SideRes/>
        <div className="flex self-end justify-center items-center my-2">
          <span className="text-xs text-slate-400">DoubleQuotes &copy; 2024. All rights reserved.</span>
        </div>
        <div className="flex w-full justify-between items-center rounded-xl p-2 mb-1">
          <span className='text-transparent'>end div</span>
        </div>
    </SimpleBar>
    </>
  )
}
