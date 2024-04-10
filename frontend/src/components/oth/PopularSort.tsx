import Select from "../layout/Select"

export default function PopularSort() {

  return (
    <div className="flex flex-col md:w-[699px] self-start ps-2 md:ps-10 mb-2 md:pe-14">
      <div className="flex w-full ">
        <Select type="type"/>
        <Select type="location"/>
        <Select type="view"/>
      </div>
      <hr className='border-0 mt-2 h-[1px] bg-[#222320]'/>
    </div>
  )
}
