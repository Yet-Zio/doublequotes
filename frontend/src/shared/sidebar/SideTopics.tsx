import { Baseball, CaretDown, CaretUp, Cat, ChartLineUp, GameController, MaskHappy, ShieldStar, TelevisionSimple,
    Onigiri} from "@phosphor-icons/react";
import { AnimatePresence, motion} from "framer-motion";
import { useState } from "react";

export default function SideTopics() {

    const [topicsExposed, setTopicsExposed] = useState(true)

    const [gamingExposed, setGamingExposed] = useState(false)
    const [sportsExposed, setSportsExposed] = useState(false)
    const [businessExposed, setBusinessExposed] = useState(false)
    const [cryptoExposed, setCryptoExposed] = useState(false)
    const [televisionExposed, setTelevisionExposed] = useState(false)
    const [memesExposed, setMemesExposed] = useState(false)

    const [otherTopics, setOtherTopics] = useState(false)

    const topicVariants = {
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
        exit: { 
            y: -10,
            opacity: 0, 
            transition: {
                duration: 0.1,
            }
        }
    }
  return (
    <div className="flex flex-col w-full">
        <hr className='border-0 h-[1px] bg-[#222320] mb-5'/>
        <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 select-none" onClick={() => {setTopicsExposed(!topicsExposed)}}>
            <span className="text-sm text-slate-400">TOPICS</span>
            <motion.div animate={{rotate: topicsExposed ? 0 : -180}} transition={{duration: 0.3}}><CaretUp size={16}/></motion.div>
        </div>
        <AnimatePresence>
            {topicsExposed && (
                <motion.div className="flex flex-col w-full p-2 select-none"
                    variants={topicVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1" onClick={() => {setGamingExposed(!gamingExposed)}}>
                        <div className="flex items-center">
                            <GameController size={16} className="me-2"/>
                            <span className="text-sm text-white">Gaming</span>
                        </div>
                        <motion.div animate={{rotate: gamingExposed ? 180 : 0}} transition={{duration: 0.3}}><CaretDown size={16}/></motion.div>
                    </div>
                    {/* Gaming */}
                    {gamingExposed && (
                        <motion.div className="flex flex-col ms-2">
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Phasmophobia</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Grand Theft Auto</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Minecraft</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Lethal Company</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Valorant</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Counter Strike</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Among Us</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Rocket League</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Call of Duty</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Elden Ring</span>
                            </div>
                        </motion.div>
                    )}
                    
                    <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1" onClick={() => {setSportsExposed(!sportsExposed)}}>
                        <div className="flex items-center">
                            <Baseball size={16} className="me-2"/>
                            <span className="text-sm text-white">Sports</span>
                        </div>
                        <motion.div animate={{rotate: sportsExposed ? 180 : 0}} transition={{duration: 0.3}}><CaretDown size={16}/></motion.div>
                    </div>
                    {/* Sports */}
                    {sportsExposed && (
                        <motion.div className="flex flex-col ms-2">
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Football</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">NBA</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">UFC</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Tennis</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Cricket</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Hockey</span>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1" onClick={() => {setBusinessExposed(!businessExposed)}}>
                        <div className="flex items-center">
                            <ChartLineUp size={16} className="me-2"/>
                            <span className="text-sm text-white">Business</span>
                        </div>
                        <motion.div animate={{rotate: businessExposed ? 180 : 0}} transition={{duration: 0.3}}><CaretDown size={16}/></motion.div>
                    </div>
                    {/* Business */}
                    {businessExposed && (
                        <motion.div className="flex flex-col ms-2">
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">GameStop</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Best Buy</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">SpaceX</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Amazon</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Pfizer</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Johnson & Johnson</span>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1" onClick={() => {setCryptoExposed(!cryptoExposed)}}>
                        <div className="flex items-center">
                            <ShieldStar size={16} className="me-2"/>
                            <span className="text-sm text-white">Crypto</span>
                        </div>
                        <motion.div animate={{rotate: cryptoExposed ? 180 : 0}} transition={{duration: 0.3}}><CaretDown size={16}/></motion.div>
                    </div>
                    {/* Crypto */}
                    {cryptoExposed && (
                        <motion.div className="flex flex-col ms-2">
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Cardano</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Dogecoin</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Algorand</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Bitcoin</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Litecoin</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Bitcoin Cash</span>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1" onClick={() => {setTelevisionExposed(!televisionExposed)}}>
                        <div className="flex items-center">
                            <TelevisionSimple size={16} className="me-2"/>
                            <span className="text-sm text-white">Television</span>
                        </div>
                        <motion.div animate={{rotate: televisionExposed ? 180 : 0}} transition={{duration: 0.3}}><CaretDown size={16}/></motion.div>
                    </div>
                    {/* Television */}
                    {televisionExposed && (
                        <motion.div className="flex flex-col ms-2">
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Breaking Bad</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Friends</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Game of Thrones</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Rick and Morty</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Peaky Blinders</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">The Walking Dead</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Stranger Things</span>
                            </div>
                        </motion.div>
                    )}
                    <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1" onClick={() => {setMemesExposed(!memesExposed)}}>
                        <div className="flex items-center">
                            <MaskHappy size={16} className="me-2"/>
                            <span className="text-sm text-white">Memes</span>
                        </div>
                        <motion.div animate={{rotate: memesExposed ? 180 : 0}} transition={{duration: 0.3}}><CaretDown size={16}/></motion.div>
                    </div>
                    {/* Memes */}
                    {memesExposed && (
                        <motion.div className="flex flex-col ms-2">
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Spongebob</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Virgin vs Chad</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Sus</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Are ya winning son?</span>
                            </div>
                            <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl mb-1 p-2">
                                <span className="text-sm text-white">Doge</span>
                            </div>
                        </motion.div>
                    )}
                    {otherTopics && (
                        <>
                        <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1">
                            <div className="flex items-center">
                                <Cat size={16} className="me-2"/>
                                <span className="text-sm text-white">Animals and Pets</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-between items-center hover:bg-[#1f211d] rounded-xl p-2 mb-1">
                            <div className="flex items-center">
                                <Onigiri size={16} className="me-2"/>
                                <span className="text-sm text-white">Anime</span>
                            </div>
                        </div>
                        </>
                    )}
                    <button className="mt-2 pt-2 pb-2 ps-4 pe-4 bg-transparent hover:bg-[#1f211d] self-start rounded-full text-xs" onClick={() => {setOtherTopics(!otherTopics)}}>{otherTopics ? "See less" : "See more"}</button>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}
