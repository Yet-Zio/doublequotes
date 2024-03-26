import React from 'react'
import Sidebar from '../shared/sidebar/Sidebar'

export default function Home() {
  return (
    <div className='flex min-h-screen min-w-screen'>
      <Sidebar/>
      <div className="popularposts">

      </div>
      <div className="latestposts">
        {/* include filtering */}
      </div>
    </div>
  )
}
