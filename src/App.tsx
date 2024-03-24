import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './shared/Header'
import Home from "./common/Home"

export default function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}
