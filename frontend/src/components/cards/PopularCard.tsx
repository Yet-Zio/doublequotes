import { Link } from 'react-router-dom'

export default function PopularCard({title, description, topquotepage, imgsrc, link} : PopularCardProps) {
  return (
    <Link to={link}  className="flex flex-col-reverse w-[287px] h-[185px] bg-cover rounded-lg cursor-pointer" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.75)), url('${imgsrc}')`}}>
      <span className='ps-3 text-xs text-white font-bold useinter pb-3 pt-2 select-none' ><span className='text-gray-300'>“</span>{topquotepage}<span className='text-gray-300'>”</span> <span className='text-gray-300'>and more</span></span>
      <span className='ps-3 text-sm text-white useinter truncate pe-2 select-none'>{description}</span>
      <span className='ps-3 text-2xl text-white font-bold useinter truncate pe-2 select-none'>{title}</span>
    </Link>
  )
}
