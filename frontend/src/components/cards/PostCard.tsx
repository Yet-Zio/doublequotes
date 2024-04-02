import { Link } from "react-router-dom";
import { ENDQUOTE, STARTQUOTE } from "../../constants";
import { ArrowFatDown, ArrowFatUp, ChatCenteredText, DotsThree, Export } from "@phosphor-icons/react";

export default function PostCard({forhome = false, view = "Card", postdetails} : PostCardProps) {
  return (
    <div className="flex flex-col w-[360px] md:w-[600px] cursor-pointer hover:bg-[#1f211d] rounded-xl mb-5 p-2 useinter">
      {view === "Card" ? "" : ""}
      <div className="flex w-full justify-between">
        <div className="flex w-[1/4] justify-center items-center">
          <div className="flex w-[24px] h-[24px] rounded-full bg-cover justify-center items-center me-1" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
          <Link to={postdetails.link} className="text-[#A9A74F] text-xs">{forhome ? `${STARTQUOTE + postdetails.communityname + ENDQUOTE}` : `${postdetails.uname}`}</Link>
          <span className="text-xs me-1 text-slate-500">&nbsp;•&nbsp;</span>
          <span className="text-xs text-slate-400">{postdetails.timestamp}</span>
        </div>
        <div className="flex w-[1/4] justify-center items-center">
          <button className="ps-4 pe-4 bg-[#A9A74F] hover:bg-[#A9A74F]/75 rounded-full text-xs h-8 justify-center items-center">Join</button>
          <button className='font-bold ms-2 flex justify-center items-center h-10 w-10 bg-transparent rounded-full useinter text-sm hover:bg-[#30312f]'><DotsThree size={16}/></button>
        </div>
      </div>
      <div className="flex flex-col w-full h-[452px]">
        <span className="text-xl text-white h-[47px] font-bold">{postdetails.title}</span>
        <div className="flex w-full h-[404px]">
          {postdetails.thumbnail}
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex p-2 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2">
          <ArrowFatUp size={20} className="hover:text-[#A9A74F] cursor-pointer me-1 rounded-full hover:bg-[#383c34]"/>
          <span className="text-sm me-1 select-text">{postdetails.score}</span>
          <ArrowFatDown size={20} className="hover:text-[#A9A74F] cursor-pointer rounded-full hover:bg-[#383c34]"/>
        </div>
        <div className="flex p-2 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-pointer hover:bg-[#383c34]">
          <ChatCenteredText size={20} className="me-1"/>
          <span className="text-sm">{postdetails.commentcount}</span>
        </div>
        <div className="flex p-2 ps-3 pe-3 rounded-full bg-[#1a1b18] cursor-pointer hover:bg-[#383c34]">
          <Export size={20} className="me-1"/>
          <span className="text-sm">Share</span>
        </div>
      </div>
    </div>
  )
}
