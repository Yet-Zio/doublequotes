import { useState } from "react"
import Select from "../layout/Select"

export default function PopularSort() {
  const [filterObj, setFilterObj] = useState<PopularSort>({type: "Hot", location: "Everywhere", view: "Card"})

  return (
    <div className="flex self-start ms-20 mb-7">
      <Select type="type"/>
    </div>
  )
}
