import Lottie from "lottie-react"
import SuccessAnimation from "../../assets/Success.json"
import ErrorAnimation from "../../assets/Error.json"
import WarningAnimation from "../../assets/Warning.json"
import InfoAnimation from "../../assets/Info.json"
import LoadingAnimation from "../../assets/Loading.json"
import {motion, AnimatePresence} from "framer-motion"
import { CaretDown, XCircle } from "@phosphor-icons/react"
import { useState } from "react"

export default function PopupBox({type, message, moreinfo, closebt, setSignupProcess, setLoginProcess} : PopupBoxProps) {

  const [showPopup, setShowPopup] = useState(true)
  const [expandInfo, setExpandInfo] = useState(false)

  const renderPopupIcon = () => {
    switch (type){
      case "success":
        return <Lottie animationData={SuccessAnimation} loop={false} style={{ width: 250, height: 250 }}/>
      case "error":
        return <Lottie animationData={ErrorAnimation} loop={false} style={{ width: 250, height: 250 }}/>
      case "warning":
        return <Lottie animationData={WarningAnimation} loop={false} style={{ width: 250, height: 250 }}/>
      case "info":
        return <Lottie animationData={InfoAnimation} loop={false} style={{ width: 250, height: 250 }}/>
      case "loading":
        return <Lottie animationData={LoadingAnimation} loop={true} style={{ width: 200, height: 200 }}/>
      default:
        return <Lottie animationData={SuccessAnimation} loop={false} style={{ width: 250, height: 250 }}/>
    }
  }

  const renderTitle = () => {
    if(message){
      return (expandInfo ? <></>: <motion.span
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
         className={`mt-3 ${setLoginProcess ? "text-2xl" : "text-lg"} inter font-semibold`}>{message}</motion.span>)
    }
  }

  const renderMoreInfo = () => {
    if(moreinfo){
      return (
      <>
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 1}}
       className={`${!expandInfo && "mt-3"} text-sm inter font-medium text-[#A9A74F] underline flex justify-center items-center cursor-pointer select-none`} onClick={() => setExpandInfo(!expandInfo)}>
        {expandInfo ? <span>Hide info</span> : <span>More info</span>}
        <motion.div
        animate={{ rotate: expandInfo ? 180 : 0}} transition={{ duration: 0.3 }}
        >
          <CaretDown className="m-2 text-slate-300" size={16}/>
        </motion.div>
      </motion.div>
      {expandInfo && (
        <motion.div
        initial={{y:-10, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.2}}
        >
          <span className="text-xs inter selection:bg-[#A9A74F] text-slate-300">{moreinfo}</span>
        </motion.div>
      )}
      </>
      )
    }
  }

  const popupVariants = {
    hidden: {
      width: 0,
      height: 0
    },
    visible: {
      width: 400,
      height: 400
    }
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="flex w-screen h-screen justify-center items-center absolute z-10 bg-[#1a1e15]/45">
          <motion.div
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
           className="flex flex-col relative justify-center items-center z-20 bg-[#242a1d] rounded-2xl p-2">
            {closebt && (
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <XCircle size={32} weight="fill" className="cursor-pointer text-[#A9A74F] hover:text-[#A9A74F]/75" onClick={() => {setShowPopup(!showPopup)
                  if(setSignupProcess){
                    setSignupProcess({start: false, success: false, done: false, signupres: ""})
                  }
                  else if(setLoginProcess){
                    setLoginProcess({start: false, success: false, done: false, loginres: ""})
                  }
                }}/>
              </div>
            )}
            {renderPopupIcon()}
            {renderTitle()}
            {renderMoreInfo()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
