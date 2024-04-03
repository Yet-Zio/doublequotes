import { Link, useNavigate } from "react-router-dom";
import { ENDQUOTE, STARTQUOTE } from "../../constants";
import { ArrowFatDown, ArrowFatUp, ChatCenteredText, DotsThree, Export, Flag } from "@phosphor-icons/react";
import { AnimatePresence, motion} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function PostCard({forhome = false, view = "Card", postdetails} : PostCardProps) {
  const navigate = useNavigate()

  const [postMenu, setPostMenu] = useState(false)

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
      }
    }

    const handleScroll = () => {
        setPostMenu(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [postMenuRef])

  return (
    <div className="flex flex-col w-[360px] md:w-[600px] cursor-pointer hover:bg-[#1f211d] rounded-xl mb-3 p-2 useinter">
      {view === "Card" ? (
        <>
          <div className="flex w-full justify-between">
            <div className="flex w-[1/4] justify-center items-center">
              <div className="flex w-[24px] h-[24px] rounded-full bg-cover justify-center items-center me-1" style={{backgroundImage: `url('/dbquotes.svg')`}} onClick={() => {navigate((forhome ? "~/" + postdetails.communityname : "u/" + postdetails.uname))}}></div>
              <Link to={(forhome ? "~/" + postdetails.communityname : "u/" + postdetails.uname)} className={`text-[#A9A74F] text-xs ${forhome && "font-bold"} hover:text-[#A9A74F]/75`}>{forhome ? `${STARTQUOTE + postdetails.communityname + ENDQUOTE}` : `${postdetails.uname}`}</Link>
              <span className="text-xs me-1 text-slate-500">&nbsp;•&nbsp;</span>
              <span className="text-xs text-slate-400">{postdetails.timestamp}</span>
            </div>
            <div className="flex w-[1/4] relative justify-center items-center mb-2">
              <button className="ps-4 pe-4 bg-[#A9A74F] hover:bg-[#A9A74F]/75 rounded-full text-xs h-8 justify-center items-center">Join</button>
              <button ref={postMenuRef} className='font-bold ms-2 flex justify-center items-center h-10 w-10 bg-transparent rounded-full useinter text-sm hover:bg-[#30312f]' onClick={() => {setPostMenu(!postMenu)}}><DotsThree size={16}/></button>
              <AnimatePresence>
                {postMenu && (
                  <motion.div className="flex mt-20 absolute bg-[#1a1e15] flex-col w-[115px] h-[40px] space-y-1 rounded-lg"
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden">
                      <div className="flex w-full h-full justify-evenly items-center hover:bg-[#2a3022] rounded-lg">
                        <Flag size={20}/>
                        <span className="text-sm">Report</span>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <Link to={"~/" + postdetails.communityname + "/comments/" + postdetails.postid} className="flex flex-col w-full h-[452px]">
            <span className="text-xl text-white h-[47px] font-bold mb-4 md:mb-1">{postdetails.title.slice(0, 52) + ". . ."}</span>
            <div className="flex w-full h-[404px]">
              {postdetails.thumbnail}
            </div>
          </Link>
          <div className="flex w-full cursor-auto">
            <div className="flex p-2 ps-3 pe-3 rounded-full bg-[#1a1b18] me-2 cursor-auto">
              <ArrowFatUp size={20} className="hover:text-[#A9A74F] cursor-pointer me-1 rounded-full hover:bg-[#383c34]"/>
              <span className="text-sm me-1 select-text">{postdetails.score}</span>
              <ArrowFatDown size={20} className="hover:text-red-700 cursor-pointer rounded-full hover:bg-[#383c34]"/>
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
        </>
      ) : (
        <>

        </>
      )}
      <hr className='border-0 mt-4 h-[1px] bg-[#222320]'/>
    </div>
  )
}
