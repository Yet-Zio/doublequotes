import { useEffect } from "react"
import { useDQDispatch } from "../../redux/hooks"
import { setHeader } from "../../redux/header/headerSlice"
import { SmileySad } from "@phosphor-icons/react"

export default function PageNotFound() {

    const dispatch = useDQDispatch()

    useEffect(() => {
      dispatch(setHeader(false))
      document.title = "404 Not Found"
    }, [])

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
        <div className="flex flex-col w-full items-center mt-10">
          <SmileySad size={384} color="#949494"/>
          <span className="text-7xl mt-4 usedbquotes tracking-wider">404</span>
          <span className="text-3xl mt-4 usedbquotes tracking-wider">Page Not Found</span>
        </div>
        <div className="absolute bottom-56 flex flex-col w-full items-center self-end">
          <span className="text-2xl usedbquotes text-[#949494]">Oh noooooo! It's a page not found error. Everyone retreat!!!</span>
        </div>
    </div>
  )
}
