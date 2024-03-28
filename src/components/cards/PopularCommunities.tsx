export default function PopularCommunities() {
  return (
    <div className="hidden fixed ms-[620px] xl:flex xl:flex-col w-[316px] h-[430px] bg-[#050505] rounded-xl p-5">
        <span className="text-xs text-slate-400 useinter mb-5">POPULAR COMMUNITIES</span>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('./dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“explainlikeimfive”</span>
            <span className="text-xs text-slate-400">22,779,796 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('./dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“PS4”</span>
            <span className="text-xs text-slate-400">5,583,393 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('./dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“apple”</span>
            <span className="text-xs text-slate-400">4,834,130 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('./dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“NBA2K”</span>
            <span className="text-xs text-slate-400">539,351 members</span>
          </div>
        </div>
        <div className="flex mt-3 cursor-pointer hover:bg-[#1f211d] p-2 rounded-xl">
          <div className="flex w-[30px] h-[30px] rounded-full bg-cover" style={{backgroundImage: `url('./dbquotes.svg')`}}></div>
          <div className="flex flex-col ms-2 useinter">
            <span className="text-sm text-[#A9A74F]">“xboxone”</span>
            <span className="text-xs text-slate-400">4,004,734 members</span>
          </div>
        </div>
        
        <button className="mt-2 pt-2 pb-2 ps-4 pe-4 bg-transparent hover:bg-[#1f211d] self-start rounded-full text-xs">See more</button>
    </div>
  )
}
