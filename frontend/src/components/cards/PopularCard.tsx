import { Link } from 'react-router-dom'

export default function PopularCard({title, description, topquotepage, imgsrc} : PopularCardProps) {
  return (
    <Link to="/~memes"  className="flex flex-col-reverse w-[287px] h-[185px] bg-cover rounded-lg cursor-pointer" style={{backgroundImage: `url('${imgsrc}')`}}>
      <span className='ps-3 text-xs text-white font-bold useinter pb-3 pt-2 select-none' style={{textShadow: '-1px -1px 0 #0c0d0c, 1px -1px 0 #000, -1px 1px 0 #0c0d0c, 1px 1px 0 #000'}}><span className='text-gray-300'>“</span>{topquotepage}<span className='text-gray-300'>”</span> <span className='text-gray-300'>and more</span></span>
      <span className='ps-3 text-sm text-white useinter truncate pe-2 select-none' style={{textShadow: '-1px -1px 0 #0c0d0c, 1px -1px 0 #000, -1px 1px 0 #0c0d0c, 1px 1px 0 #000'}}>{description}</span>
      <span className='ps-3 text-2xl text-white font-bold useinter truncate pe-2 select-none' style={{textShadow: '-1px -1px 0 #0c0d0c, 1px -1px 0 #000, -1px 1px 0 #0c0d0c, 1px 1px 0 #000'}}>{title}</span>
    </Link>
  )
}
