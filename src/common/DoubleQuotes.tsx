import Sidebar from '../shared/sidebar/Sidebar'
import Home from './pages/Home'
import Trending from './pages/Trending'
import { useDQSelector } from '../redux/hooks'

export default function DoubleQuotes() {

  const pageToRender = useDQSelector(state => state.sideopt.option)

  const renderPage = () => {
    switch(pageToRender){
      case "Home":
        return <Home/>
      case "Trending":
        return <Trending/>
      default:
        return <Home/>
    }
  }

  return (
    <div className='flex min-h-screen min-w-screen'>
      <Sidebar/>
      {renderPage()}
    </div>
  )
}
