import { useEffect, useRef, useState } from "react";
import { useDQDispatch, useDQSelector } from "../../redux/hooks";
import { CaretDown, Rows } from "@phosphor-icons/react";
import { AnimatePresence, motion} from "framer-motion";
import { changetype } from "../../redux/sortoptions/SortOptSlice";

export default function Select({type}: SortSelectProps) {
  const [isExpand, setIsExpand] = useState(false)
  const dispatch = useDQDispatch()

  const currentType = useDQSelector((state) => state.sortopt.type)
  const currentLocation = useDQSelector((state) => state.sortopt.location)
  const currentView = useDQSelector((state) => state.sortopt.view)

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

  const typeoptions = ['Hot', 'Best', 'New', 'Top', 'Rising']

  const expandRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (expandRef.current && !expandRef.current.contains(event.target)) {
        setIsExpand(false)
      }
    }

    const handleScroll = () => {
        setIsExpand(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [expandRef])

  

  const renderSelect = () => {
    switch(type){
        case "type":
            return (<div className="flex flex-col">
                <div ref={expandRef} className={`flex bg-[#0c0d0c] relative justify-evenly items-center p-2 ps-4 pe-4 rounded-full hover:bg-[#3c3e39] cursor-pointer ${isExpand ? "bg-[#3c3e39]" : ""}`} onClick={() => setIsExpand(!isExpand)}>
                    <span className="text-xs me-4 text-[#b2b8aa]">{currentType}</span>
                    <CaretDown size={16} className="text-[#b2b8aa]"/>
                </div>
                <AnimatePresence>
                    {isExpand && (
                        <motion.div className="flex mt-10 absolute bg-[#1a1e15] flex-col w-[80px] h-[285px] space-y-1 rounded-lg"
                            variants={expandVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden">
                            <span className="text-sm font-bold p-2 pt-3">Sort by</span>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[0] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype("Hot")); setIsExpand(!isExpand)}}><span className="text-sm">{typeoptions[0]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[1] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype("Best")); setIsExpand(!isExpand)}}><span className="text-sm">{typeoptions[1]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[2] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype("New")); setIsExpand(!isExpand)}}><span className="text-sm">{typeoptions[2]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[3] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype("Top")); setIsExpand(!isExpand)}}><span className="text-sm">{typeoptions[3]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] pb-2 ${typeoptions[4] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype("Rising")); setIsExpand(!isExpand)}}><span className="text-sm">{typeoptions[4]}</span></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>)
        case "location":
            return (<div></div>)
        case "view":
            return (<div></div>)
        default:
            return (<div></div>)
    }
  }

  return (
    <>
    {renderSelect()}
    </>
  )
}
