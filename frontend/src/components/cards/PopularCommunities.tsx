import { useEffect, useState } from "react"
import SimpleBar from "simplebar-react";

export default function PopularCommunities() {
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [showOtherComms, setShowOtherComms] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [window.scrollY]);
  return (
    <div className={`hidden fixed ms-[640px] ${currentScrollY >= 197 ? "top-20" : ""} xl:flex xl:flex-col w-[316px] ${showOtherComms ? "h-[630px]" : "h-[430px]"} bg-[#050505] rounded-xl p-5`}>
      <SimpleBar forceVisible="y" autoHide={true} style={{height: "600px"}}>
        <span className="text-xs text-slate-400 useinter mb-5">POPULAR COMMUNITIES</span>
        {/* Remember to make them links later */}
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“explainlikeimfive”</span>
            <span className="text-xs text-slate-400">22,779,796 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“PS4”</span>
            <span className="text-xs text-slate-400">5,583,393 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“apple”</span>
            <span className="text-xs text-slate-400">4,834,130 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“NBA2K”</span>
            <span className="text-xs text-slate-400">539,351 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“xboxone”</span>
            <span className="text-xs text-slate-400">4,004,734 members</span>
          </div>
        </div>
        {showOtherComms && (
          <>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
            <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
            <div className="flex flex-col ms-2 useinter">
              <span className="text-sm text-[#A9A74F]">“xboxone”</span>
              <span className="text-xs text-slate-400">4,004,734 members</span>
            </div>
          </div>
          </>
        )}
        <button className="mt-2 pt-2 pb-2 ps-4 pe-4 bg-transparent hover:bg-[#1f211d] self-start rounded-full text-xs" onClick={() => {setShowOtherComms(!showOtherComms)}}>{showOtherComms ? "See less" : "See more"}</button>
      </SimpleBar>
    </div>
  )
}
