import { CaretUp, Coins, Question, Quotes, TrendUp } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function SideRes() {
  const [resExposed, setResExposed] = useState(true);

  const resVariants = {
    hidden: {
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };
  return (
    <div className="flex flex-col w-full mt-2">
      <hr className="border-0 h-[1px] bg-[#222320] mb-5" />
      <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 select-none" onClick={() => {setResExposed(!resExposed)}}>
        <span className="text-sm text-slate-400">RESOURCES</span>
        <motion.div animate={{ rotate: resExposed ? 0 : -180 }} transition={{ duration: 0.3 }}>
          <CaretUp size={16} />
        </motion.div>
      </div>
      <AnimatePresence>
        {resExposed && (
            <motion.div className="flex flex-col w-full p-2 select-none"
                variants={resVariants}
                initial="hidden"
                animate="visible"
                exit="exit">
                <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1">
                    <div className="flex items-center">
                        <Question size={20} className="me-2"/>
                        <span className="text-sm text-white">Help</span>
                    </div>
                </div>
                <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1">
                    <div className="flex items-center">
                        <Coins size={20} className="me-2"/>
                        <span className="text-sm text-white">Glossary of Chips</span>
                    </div>
                </div>
                <hr className="border-0 h-[1px] bg-[#222320] my-2" />
                <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1">
                    <div className="flex items-center">
                        <TrendUp size={20} className="me-2"/>
                        <span className="text-sm text-white">Best Communities</span>
                    </div>
                </div>
                <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1">
                    <div className="flex items-center">
                        <Quotes size={20} className="me-2"/>
                        <span className="text-sm text-white">About DoubleQuotes</span>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
