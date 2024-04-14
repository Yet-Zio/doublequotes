import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './shared/Header'
import DoubleQuotes from "./common/DoubleQuotes"
import Login from "./common/auth/Login"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<DoubleQuotes pagetorender="Trending"/>}/>
          <Route path="/~/trending" element={<DoubleQuotes pagetorender="Trending"/>}/>
          <Route path="/~/home" element={<DoubleQuotes pagetorender="Home"/>}/>
          <Route path="/~/explore" element={<DoubleQuotes pagetorender="Explore"/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}
