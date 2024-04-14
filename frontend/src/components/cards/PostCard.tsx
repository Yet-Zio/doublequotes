import { Link, useNavigate} from "react-router-dom";
import { ENDQUOTE, STARTQUOTE } from "../../constants";
import { ArrowFatDown, ArrowFatUp, ChatCenteredText, DotsThree, Export, Flag } from "@phosphor-icons/react";
import { AnimatePresence, motion} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function PostCard({forhome = false, view = "Card", postdetails} : PostCardProps) {

  const [postMenu, setPostMenu] = useState(false)
  const [avHover, setAvHover] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hoverLink, setHoverLink] = useState("/~/" + postdetails.communityname + "/comments/" + postdetails.postid)

  const navigate = useNavigate()

  const expandVariants = {
    hidden: { 
        y: -10,
        opacity: 0, 
        transition: {
            duration: 0.2,
        }
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
        }
    },
  }

  const postMenuRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (postMenuRef.current && !postMenuRef.current.contains(event.target)){
        setPostMenu(false)
        setIsHovered(false)
      }
    }

    const handleScroll = () => {
        setPostMenu(false)
        setIsHovered(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [postMenuRef])

  const renderCard = () => {
    return (
      <>
          <div className="flex w-full justify-between">
            <div className="flex w-[1/4] justify-center items-center">
              <div className="flex w-[24px] h-[24px] rounded-full bg-cover justify-center items-center me-1" style={{backgroundImage: `url('${postdetails.avatar ? postdetails.avatar : "/dbquotes.svg"}')`}} onClick={(e) => {e.preventDefault(); navigate(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseEnter={() => {setAvHover(!avHover); setHoverLink(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseLeave={() => {setAvHover(!avHover); setHoverLink("/~/" + postdetails.communityname + "/comments/" + postdetails.postid)}}></div>
              <div className={`text-[#A9A74F] text-xs ${forhome && "font-bold"} hover:text-[#A9A74F]/75 ${avHover ? "text-[#A9A74F]/75": ""}`} onClick={(e) => {e.preventDefault(); navigate(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseEnter={() => {setHoverLink(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseLeave={() => {setHoverLink("/~/" + postdetails.communityname + "/comments/" + postdetails.postid)}}>{forhome ? `${STARTQUOTE + postdetails.communityname + ENDQUOTE}` : `${postdetails.uname}`}</div>
              <span className="text-xs me-1 text-slate-500">&nbsp;•&nbsp;</span>
              <span className="text-xs text-slate-400">{postdetails.timestamp}</span>
            </div>
            <div className="flex w-[1/4] relative justify-center items-center mb-2">
              <button className="ps-4 pe-4 bg-[#A9A74F] hover:bg-[#A9A74F]/75 rounded-full text-xs h-8 justify-center items-center" onClick={(e) => {e.preventDefault()}} onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>Join</button>
              <button ref={postMenuRef} className='font-bold ms-2 flex justify-center items-center h-10 w-10 bg-transparent rounded-full useinter text-sm hover:bg-[#30312f]' onClick={(e) => {e.preventDefault(); setPostMenu(!postMenu)}} onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}><DotsThree size={16}/></button>
              <AnimatePresence>
                {postMenu && (
                  <motion.div className="flex mt-20 absolute bg-[#1a1e15] flex-col w-[115px] h-[40px] space-y-1 rounded-lg"
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={(e) => {e.preventDefault()}}
                    onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                      <div className="flex w-full h-full justify-evenly items-center hover:bg-[#2a3022] rounded-lg" onClick={(e) => e.preventDefault()}>
                        <Flag size={20}/>
                        <span className="text-sm">Report</span>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col w-full h-[452px]">
            <span className="text-xl text-white h-[47px] font-bold mb-4 md:mb-1">{postdetails.title.slice(0, 52) + ". . ."}</span>
            <div className="flex w-full h-[404px] mb-2 me-4 rounded-xl">
              <img src={postdetails.thumbimg} className="flex w-full h-full rounded-xl object-cover"/>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex p-2 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-auto" onClick={(e) => {e.preventDefault()}} onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
              <ArrowFatUp size={20} className="hover:text-[#A9A74F] cursor-pointer me-1 rounded-full hover:bg-[#383c34]"/>
              <span className="text-sm me-1 select-text">{postdetails.score}</span>
              <ArrowFatDown size={20} className="hover:text-red-700 cursor-pointer rounded-full hover:bg-[#383c34]"/>
            </div>
            <div className="flex p-2 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-pointer hover:bg-[#383c34]">
              <ChatCenteredText size={20} className="me-1"/>
              <span className="text-sm">{postdetails.commentcount}</span>
            </div>
            <div className="flex p-2 ps-3 pe-3 rounded-full bg-[#1a1b18] cursor-pointer hover:bg-[#383c34]" onClick={(e) => {e.preventDefault()}} onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
              <Export size={20} className="me-1"/>
              <span className="text-sm">Share</span>
            </div>
          </div>
          <hr className='border-0 mt-4 h-[1px] bg-[#222320]'/>
      </>
    )
  }

  const renderCompact = () => {
    return (
      <>
          <div className="flex w-full mb-2 me-4 rounded-xl">
              <img src={postdetails.thumbimg} className="flex w-[102px] h-[76px] rounded-xl object-cover"/>
              <div className="flex flex-col w-full">
                <div className="flex w-full items-center flex-wrap space-y-1 md:space-y-0">
                  <div className="flex ms-2 w-[16px] h-[16px] rounded-full bg-cover justify-center items-center me-1" style={{backgroundImage: `url('${postdetails.avatar ? postdetails.avatar : "/dbquotes.svg"}')`}} onClick={(e) => {e.preventDefault(); navigate(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseEnter={() => {setAvHover(!avHover); setHoverLink(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseLeave={() => {setAvHover(!avHover); setHoverLink("/~/" + postdetails.communityname + "/comments/" + postdetails.postid)}}></div>
                  <div className={`text-[#A9A74F] ms-1 text-xs ${forhome && "font-bold"} hover:text-[#A9A74F]/75 ${avHover ? "text-[#A9A74F]/75": ""}`} onClick={(e) => {e.preventDefault(); navigate(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseEnter={() => {setHoverLink(forhome ? "/~/" + postdetails.communityname : "u/" + postdetails.uname)}} onMouseLeave={() => {setHoverLink("/~/" + postdetails.communityname + "/comments/" + postdetails.postid)}}>{forhome ? `${STARTQUOTE + postdetails.communityname + ENDQUOTE}` : `${postdetails.uname}`}</div>
                  <button className="ms-2 ps-4 pe-4 bg-[#A9A74F] hover:bg-[#A9A74F]/75 rounded-full text-xs h-6 justify-center items-center" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>Join</button>
                  <span className="text-xs ms-1 me-1 text-slate-500">&nbsp;•&nbsp;</span>
                  <span className="ms-2 md:ms-0 text-xs text-slate-400">{postdetails.timestamp}</span>
                </div>
                <div className="flex w-full items-center mt-2 md:mt-0">
                  <span className="ms-2 text-base text-white font-bold mb-4 md:mb-1">{postdetails.title.slice(0, 52) + ". . ."}</span>
                </div>
                <div className="md:flex w-full items-center mt-2 hidden">
                  <div className="flex ms-1 p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-auto" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                    <ArrowFatUp size={16} className="hover:text-[#A9A74F] cursor-pointer me-1 rounded-full hover:bg-[#383c34]"/>
                    <span className="text-xs me-1 select-text">{postdetails.score}</span>
                    <ArrowFatDown size={16} className="hover:text-red-700 cursor-pointer rounded-full hover:bg-[#383c34]"/>
                  </div>
                  <div className="flex p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-pointer hover:bg-[#383c34]">
                    <ChatCenteredText size={16} className="me-1"/>
                    <span className="text-xs">{postdetails.commentcount}</span>
                  </div>
                  <div className="flex p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] cursor-pointer hover:bg-[#383c34]" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                    <Export size={16} className="me-1"/>
                    <span className="text-xs">Share</span>
                  </div>
                  <div className="flex ms-1 p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] cursor-pointer hover:bg-[#383c34]" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                    <Flag size={16} className="me-1"/>
                    <span className="text-xs">Report</span>
                  </div>
                </div>
              </div>
          </div>
          <div className="flex w-full items-center mt-2 md:hidden">
            <div className="flex ms-1 p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-auto" onClick={(e) => {e.preventDefault()}} onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
              <ArrowFatUp size={16} className="hover:text-[#A9A74F] cursor-pointer me-1 rounded-full hover:bg-[#383c34]"/>
              <span className="text-xs me-1 select-text">{postdetails.score}</span>
              <ArrowFatDown size={16} className="hover:text-red-700 cursor-pointer rounded-full hover:bg-[#383c34]"/>
            </div>
            <div className="flex p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-pointer hover:bg-[#383c34]">
              <ChatCenteredText size={16} className="me-1"/>
              <span className="text-xs">{postdetails.commentcount}</span>
            </div>
            <div className="flex p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] cursor-pointer hover:bg-[#383c34]" onClick={(e) => {e.preventDefault()}} onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
              <Export size={16} className="me-1"/>
              <span className="text-xs">Share</span>
            </div>
            <div className="flex ms-1 p-1 ps-3 pe-3 rounded-full bg-[#1a1b18] cursor-pointer hover:bg-[#383c34]" onClick={(e) => {e.preventDefault()}} onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
              <Flag size={16} className="me-1"/>
              <span className="text-xs">Report</span>
            </div>
          </div>
          <hr className='border-0 h-[1px] mt-2 bg-[#222320]'/>
      </>
    )
  }

  return (
    <>
      {view === "Card" ? (
        !isHovered ? (
          <Link to={hoverLink} className="flex flex-col w-[320px] md:w-[600px] cursor-pointer hover:bg-[#1f211d] rounded-xl mb-3 p-2 useinter">
            {renderCard()}
          </Link>
        ) : (
          <div className="flex flex-col w-[320px] md:w-[600px] cursor-pointer hover:bg-[#1f211d] rounded-xl mb-3 p-2 useinter">
            {renderCard()}
          </div>
        )   
      ) : (
        !isHovered ? (
          <Link to={hoverLink} className="flex flex-col w-[340px] md:w-[600px] md:h-[120px] h-[220px] cursor-pointer hover:bg-[#1f211d] rounded-xl mb-3 p-2 useinter">
          {renderCompact()}
          </Link>
        ) : (
          <div className="flex flex-col w-[340px] md:w-[600px] md:h-[120px] h-[220px] cursor-pointer hover:bg-[#1f211d] rounded-xl mb-3 p-2 useinter">
          {renderCompact()}
          </div>
        )
      )}
      </>
  )
}