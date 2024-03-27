import SideOption from './SideOption'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function Sidebar() {
  return (
    <div className='hidden md:flex flex-col min-h-screen w-[255px] border-e border-e-[#3c3e39] p-[16px] fixed'>
      <SimpleBar forceVisible="y" autoHide={true} style={{height: "100vh"}}>
        <div className="flex flex-col me-5 mb-5">
          <SideOption option="Home"/>
          <SideOption option="Trending"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
          <SideOption option="Home"/>
        </div>
      </SimpleBar>
    </div>
  )
}
