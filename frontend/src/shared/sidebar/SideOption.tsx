import { Binoculars, House, TrendUp } from "@phosphor-icons/react";
import { useDQSelector, useDQDispatch } from "../../redux/hooks";
import { change } from "../../redux/sidebar/SideOptSlice";
import { useNavigate } from "react-router-dom";

export default function SideOption({option}: SideOptProps) {

  const selectedOption = useDQSelector(state => state.sideopt.option)
  const dispatch = useDQDispatch()
  const navigate = useNavigate()

  const SideIcon = () => {
    switch (option) {
        case "Home":
            return <House size={24} />
        case "Trending":
            return <TrendUp size={24} weight="fill"/>
        case "Explore":
            return <Binoculars size={24} />
        default:
            return <House size={32} />
    }
  }

  return (
    <div className={`flex w-full h-10 ${selectedOption === option ? "bg-[#1f211d]": "bg-transparent"} items-center hover:bg-[#1f211d] rounded-xl ps-3 cursor-pointer mb-3`}
      onClick={() => {
        dispatch(change(option))
        navigate(`/~/${option.toLowerCase()}`)
        }}>
        {SideIcon()}
        <span className="ms-3 text-base text-white useinter">{option}</span>
    </div>
  );
}
