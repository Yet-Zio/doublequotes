import { useEffect, useRef, useState } from "react";
import { useDQDispatch, useDQSelector } from "../../redux/hooks";
import { CaretDown, List, Rows } from "@phosphor-icons/react";
import { AnimatePresence, motion} from "framer-motion";
import { changelocation, changetype, changeview } from "../../redux/sortoptions/SortOptSlice";

export default function Select({type}: SortSelectProps) {
  const [isTypeExpand, setIsTypeExpand] = useState(false)
  const [isLocExpand, setIsLocExpand] = useState(false)
  const [isViewExpand, setIsViewExpand] = useState(false)

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

  const typeoptions: PopularSortType[] = ['Hot', 'Best', 'New', 'Top', 'Rising']
  const locoptions: PopularSortLocation[] = ['Everywhere', 'Your Country']
  const viewoptions: PostCardType[] = ["Card", "Compact"]

  const expandTypeRef = useRef<HTMLDivElement | null>(null);
  const expandLocRef = useRef<HTMLDivElement | null>(null);
  const expandViewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (expandTypeRef.current && !expandTypeRef.current.contains(event.target)) {
        setIsTypeExpand(false)
      }
      if(expandLocRef.current && !expandLocRef.current.contains(event.target)){
        setIsLocExpand(false)
      }
      if(expandViewRef.current && !expandViewRef.current.contains(event.target)){
        setIsViewExpand(false)
      }
    }

    const handleScroll = () => {
        setIsTypeExpand(false)
        setIsLocExpand(false)
        setIsViewExpand(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [expandTypeRef, expandLocRef, expandViewRef])

  

  const renderSelect = () => {
    switch(type){
        case "type":
            return (<div className="flex flex-col">
                <div ref={expandTypeRef} className={`flex bg-[#0c0d0c] relative justify-evenly items-center p-2 ps-4 pe-4 rounded-full hover:bg-[#3c3e39] cursor-pointer ${isTypeExpand ? "bg-[#3c3e39]" : ""}`} onClick={() => setIsTypeExpand(!isTypeExpand)}>
                    <span className="text-xs me-4 text-[#b2b8aa]">{currentType}</span>
                    <CaretDown size={16} className="text-[#b2b8aa]"/>
                </div>
                <AnimatePresence>
                    {isTypeExpand && (
                        <motion.div className="flex mt-10 absolute bg-[#1a1e15] flex-col w-[80px] h-[280px] space-y-1 rounded-lg"
                            variants={expandVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden">
                            <span className="text-sm font-bold p-2 pt-3">Sort by</span>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[0] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype(typeoptions[0])); setIsTypeExpand(!isTypeExpand)}}><span className="text-sm">{typeoptions[0]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[1] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype(typeoptions[1])); setIsTypeExpand(!isTypeExpand)}}><span className="text-sm">{typeoptions[1]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[2] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype(typeoptions[2])); setIsTypeExpand(!isTypeExpand)}}><span className="text-sm">{typeoptions[2]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${typeoptions[3] === currentType ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changetype(typeoptions[3])); setIsTypeExpand(!isTypeExpand)}}><span className="text-sm">{typeoptions[3]}</span></div>
                            <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] pb-2 ${typeoptions[4] === currentType ? "bg-[#444e37]" : ""} rounded-b-md`} onClick={() => {dispatch(changetype(typeoptions[4])); setIsTypeExpand(!isTypeExpand)}}><span className="text-sm">{typeoptions[4]}</span></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>)
        case "location":
            return (<div className="flex flex-col">
            <div ref={expandLocRef} className={`flex bg-[#0c0d0c] relative justify-evenly items-center p-2 ps-4 pe-4 rounded-full hover:bg-[#3c3e39] cursor-pointer ${isLocExpand ? "bg-[#3c3e39]" : ""}`} onClick={() => setIsLocExpand(!isLocExpand)}>
                <span className="text-xs me-4 text-[#b2b8aa]">{currentLocation}</span>
                <CaretDown size={16} className="text-[#b2b8aa]"/>
            </div>
            <AnimatePresence>
                {isLocExpand && (
                    <motion.div className="flex mt-10 absolute bg-[#1a1e15] flex-col w-[130px] h-[135px] space-y-1 rounded-lg"
                        variants={expandVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden">
                        <span className="text-sm font-bold p-2 pt-3">Sort by</span>
                        <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${locoptions[0] === currentLocation ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changelocation(locoptions[0])); setIsLocExpand(!isLocExpand)}}><span className="text-sm">{locoptions[0]}</span></div>
                        <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${locoptions[1] === currentLocation ? "bg-[#444e37]" : ""} rounded-b-md`} onClick={() => {dispatch(changelocation(locoptions[1])); setIsLocExpand(!isLocExpand)}}><span className="text-sm">{locoptions[1]}</span></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>)
        case "view":
            return (<div className="flex flex-col">
            <div ref={expandViewRef} className={`flex bg-[#0c0d0c] relative justify-evenly items-center p-2 ps-4 pe-4 rounded-full hover:bg-[#3c3e39] cursor-pointer ${isViewExpand ? "bg-[#3c3e39]" : ""}`} onClick={() => setIsViewExpand(!isViewExpand)}>
                <span className="text-xs me-4 text-[#b2b8aa]">{currentView === "Card" ? <Rows size={18} className="me-2"/> : <List size={18} className="me-2"/>}</span>
                <CaretDown size={16} className="text-[#b2b8aa]"/>
            </div>
            <AnimatePresence>
                {isViewExpand && (
                    <motion.div className="flex mt-10 absolute z-20 bg-[#1a1e15] flex-col w-[130px] h-[135px] space-y-1 rounded-lg"
                        variants={expandVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden">
                        <span className="text-sm font-bold p-2 pt-3">View</span>
                        <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${viewoptions[0] === currentView ? "bg-[#444e37]" : ""}`} onClick={() => {dispatch(changeview(viewoptions[0])); setIsViewExpand(!isViewExpand)}}><span className="text-sm flex"><Rows size={20} weight="fill" className="me-2"/>{viewoptions[0]}</span></div>
                        <div className={`bg-[#1a1e15] cursor-pointer h-11 flex justify-center items-center hover:bg-[#2a3022] ${viewoptions[1] === currentView ? "bg-[#444e37]" : ""} rounded-b-md`} onClick={() => {dispatch(changeview(viewoptions[1])); setIsViewExpand(!isViewExpand)}}><span className="text-sm flex"><List size={20} weight="fill" className="me-2"/>{viewoptions[1]}</span></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>)
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
