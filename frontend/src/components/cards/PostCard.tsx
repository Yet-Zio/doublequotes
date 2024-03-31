import { Link } from "react-router-dom";
import { ENDQUOTE, STARTQUOTE } from "../../constants";

export default function PostCard({forhome = false, postdetails} : PostCardProps) {
  return (
    <div className="flex flex-col w-[360px] md:w-[600px]">
      <div className="flex w-full justify-between">
        <div className="flex w-[1/4]">
          <div className="flex w-[24px] h-[24px] rounded-full bg-cover" style={{backgroundImage: `url('/dbquotes.svg')`}}></div>
          <Link to={forhome ? `${STARTQUOTE + postdetails.communityname + ENDQUOTE}`} className=""></Lin>
        </div>
      </div>
    </div>
  )
}
