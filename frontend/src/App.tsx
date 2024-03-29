import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './shared/Header'
import DoubleQuotes from "./common/DoubleQuotes"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<DoubleQuotes/>}/>
        </Routes>
      </Router>
    </div>
  )
}
