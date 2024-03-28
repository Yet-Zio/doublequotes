import SideOption from './SideOption'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function Sidebar() {
  return (
    <>
    <div className='dummyside hidden md:flex flex-col min-h-screen w-[255px] p-[16px] me-14'>
      <div className={`dummydiv flex w-[202px] h-10 items-center rounded-xl ps-3 cursor-pointer mb-3`}>
      </div>
    </div>
    <div className='hidden md:flex flex-col min-h-screen w-[255px] bg-[#0c0d0c] border-e border-e-[#3c3e39] p-[16px] fixed'>
      <SimpleBar forceVisible="y" autoHide={true} style={{height: "100vh"}}>
        <div className="flex flex-col me-5 mb-5">
          <SideOption option="Home"/>
          <SideOption option="Trending"/>
        </div>
      </SimpleBar>
    </div>
    </>
  )
}
