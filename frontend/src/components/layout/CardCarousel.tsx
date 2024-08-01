import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence} from "framer-motion";

export default function CardCarousel({ children }: CardCarouselProps) {
  const [indexes, setIndexes] = useState({ startIndex: 0, endIndex: 4 });
  const [isAnimateX, setIsAnimateX] = useState(false)

  const handleNextClick = () => {
    setIndexes((prevIndexes) => ({
      startIndex: prevIndexes.startIndex + 2,
      endIndex: prevIndexes.endIndex + 2
    }));
    setIsAnimateX(true)
  };

  const handlePrevClick = () => {
    setIndexes((prevIndexes) => ({
      startIndex: prevIndexes.startIndex - 2,
      endIndex: prevIndexes.endIndex - 2
    }));
    setIsAnimateX(false)
  };

  return (
    <>
      <div className="relative hidden xl:flex xl:w-[960px] h-52 mt-3 space-x-3 overflow-x-hidden mb-2">
        <AnimatePresence>
          {children.slice(indexes.startIndex, indexes.endIndex).map((child, index) => (
          <motion.div
            key={index}
            className={
              index === 0 && indexes.endIndex === children.length
                ? "w-auto overflow-hidden rounded-xl"
                : ""
            }
            initial={{x: 0, opacity: 0}}
            animate={{ x: isAnimateX ? -75 : 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'tween', ease: 'backOut'}}
          >
            {child}
          </motion.div>
          ))}
          {indexes.startIndex !== 0 ? (
            <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 rounded-full h-[32px] w-[32px] bg-black/75 justify-center items-center cursor-pointer hover:bg-black" onClick={handlePrevClick}>
              <CaretLeft size={20} color="#fff"/>
            </div>
          ) : (
            ""
          )}
          {indexes.endIndex !== children.length ? (
            <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 rounded-full h-[32px] w-[32px] bg-black/75 justify-center items-center cursor-pointer hover:bg-black" onClick={handleNextClick}>
              <CaretRight size={20} color="#fff"/>
            </div>
          ) : (
            ""
        )}
      </AnimatePresence>
    </div>
    <div className="relative hide-ver-scroll flex xl:hidden w-[320px] md:w-[600px] h-52 mt-3 space-x-3 overflow-x-auto mb-2">
      {children}
    </div>
    </>
  );
}
