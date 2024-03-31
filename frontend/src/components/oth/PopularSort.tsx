import Select from "../layout/Select"

export default function PopularSort() {

  return (
    <div className="flex flex-col w-full self-start ps-7 mb-7">
      <div className="flex w-full ">
        <Select type="type"/>
        <Select type="location"/>
        <Select type="view"/>
      </div>
      <hr className='border-0 mt-2 h-[1px] md:w-3/4 bg-[#3c3e39]'/>
    </div>
  )
}
