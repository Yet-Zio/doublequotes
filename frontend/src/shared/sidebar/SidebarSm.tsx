import SideOption from './SideOption'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import SideTopics from './SideTopics';
import SideRes from './SideRes';

export default function SidebarSm() {
  return (
    <>
    {window.location.pathname !== "/~/explore" ? (
      <>
      <SimpleBar className='flex flex-col min-h-screen w-full bg-[#0c0d0c] border-e border-e-[#3c3e39] p-[2px]' forceVisible="y" autoHide={true} style={{height: "100vh"}}>
          <div className="flex flex-col me-5 mb-2">
            <SideOption option="Home"/>
            <SideOption option="Trending"/>
            <SideOption option='Explore'/>
          </div>
          <SideTopics/>
          <SideRes/>
          <div className="flex w-full justify-between items-center rounded-xl p-2 mb-1">
            <span className='text-transparent'>end div</span>
          </div>
      </SimpleBar>
      </>
    ) : ""}
    </>
  )
}
