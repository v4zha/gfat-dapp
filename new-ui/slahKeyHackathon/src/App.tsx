import { useState } from 'react'
import SideBar from './Pages/Common/SideBar'
import TopBar from './Pages/Common/TopBar'
import HomePage from './Pages/Home/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayDept from './Pages/Department/DisplayDept';
import TansDetails from './Pages/Transaction/TansDetails';
import Officers from './Pages/Officer/Officers';
import Projects from './Pages/Project/Projects';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TopBar/>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='transactions' element={<TansDetails/>}/>
        <Route path='/department' element={<DisplayDept/>}/>
        <Route path='/officer' element={<Officers/>}/>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
    </div>
      )
}

export default App
