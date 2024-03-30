import { useState } from "react";
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

  const renderSelect = () => {
    switch(type){
        case "type":
            return (<div className="flex flex-col">
                <div className="flex bg-[#0c0d0c] justify-evenly items-center p-2 ps-4 pe-4 rounded-full hover:bg-[#3c3e39] cursor-pointer" onClick={() => setIsExpand(!isExpand)}>
                    <span className="text-xs me-4 text-[#b2b8aa]">{currentType}</span>
                    <CaretDown size={16} className="text-[#b2b8aa]"/>
                </div>
                <AnimatePresence>
                    {isExpand && (
                        <motion.div className="flex mt-10 fixed bg-[#1a1e15] flex-col w-[80px] h-[285px] space-y-2 rounded-lg">
                            <span className="text-sm font-bold p-2 pt-3">Sort by</span>
                            <div className="bg-[#1a1e15] cursor-pointer h-10 flex justify-center items-center hover:bg-[#444e37]" onClick={() => {dispatch(changetype("Hot")); setIsExpand(!isExpand)}}><span className="text-sm">Hot</span></div>
                            <div className="bg-[#1a1e15] cursor-pointer h-10 flex justify-center items-center hover:bg-[#444e37]" onClick={() => {dispatch(changetype("Best")); setIsExpand(!isExpand)}}><span className="text-sm">Best</span></div>
                            <div className="bg-[#1a1e15] cursor-pointer h-10 flex justify-center items-center hover:bg-[#444e37]" onClick={() => {dispatch(changetype("New")); setIsExpand(!isExpand)}}><span className="text-sm">New</span></div>
                            <div className="bg-[#1a1e15] cursor-pointer h-10 flex justify-center items-center hover:bg-[#444e37]" onClick={() => {dispatch(changetype("Top")); setIsExpand(!isExpand)}}><span className="text-sm">Top</span></div>
                            <div className="bg-[#1a1e15] cursor-pointer h-10 flex justify-center items-center hover:bg-[#444e37] pb-2" onClick={() => {dispatch(changetype("Rising")); setIsExpand(!isExpand)}}><span className="text-sm">Rising</span></div>
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
