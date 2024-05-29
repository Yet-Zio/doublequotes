import Sidebar from '../shared/sidebar/Sidebar'
import Home from './pages/Home'
import Trending from './pages/Trending'
import { useDQDispatch, useDQSelector } from '../redux/hooks'
import { useEffect } from 'react'
import { change } from '../redux/sidebar/SideOptSlice'
import Explore from './pages/Explore'
import { setHeader } from '../redux/header/headerSlice'

export default function DoubleQuotes({pagetorender}: PageToRenderProps) {

  const pageToRender = useDQSelector(state => state.sideopt.option)
  const dispatch = useDQDispatch()

  const renderPage = () => {
    switch(pageToRender){
      case "Home":
        return <Home/>
      case "Trending":
        return <Trending/>
      case "Explore":
        return <Explore/>
      default:
        return <Home/>
    }
  }

  useEffect(() => {
    dispatch(setHeader(true))
    
    if(pagetorender){
      dispatch(change(pagetorender))
    }
  })

  return (
    <div className='flex min-h-screen min-w-screen bg-[#0c0d0c]'>
      <Sidebar/>
      {renderPage()}
    </div>
  )
}
