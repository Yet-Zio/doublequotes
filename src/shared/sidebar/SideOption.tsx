import { House, TrendUp } from "@phosphor-icons/react";
import React from "react";

export default function SideOption({option}: SideOptProps) {

  const SideIcon = () => {
    switch (option) {
        case "Home":
            return <House size={24} />
        case "Trending":
            return <TrendUp size={24} weight="fill"/>
        default:
            return <House size={32} />
    }
  }

  return (
    <div className="flex w-full h-10 bg-transparent items-center hover:bg-[#3c3e39] rounded-xl ps-3 cursor-pointer">
        {SideIcon()}
        <span className="ms-3 text-base text-white useinter">{option}</span>
    </div>
  );
}
