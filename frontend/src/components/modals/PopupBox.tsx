export default function PopupBox({type, message, moreinfo} : PopupBoxProps) {
  const renderPopupIcon = () => {
    switch (type){

    }
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center absolute z-10 bg-[#1a1e15]/45">
      <div className="flex flex-col justify-center items-center z-20 w-[400px] h-[400px] bg-[#0c0d0c] rounded-2xl p-2">
        {/* {renderPopupIcon()} */}
        <span className="">Test!</span>
      </div>
    </div>
  )
}
