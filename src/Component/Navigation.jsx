import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'
import Monthly from '../pages/Monthly'
import Weekly from '../pages/Weekly'
import Daily from '../pages/Daily'

export default function Navigation() {
  return (
   <>
   <Routes>
        <Route path="/" className="" element={<Home/>}/>
        <Route path="/Monthly" element={<Monthly/>}/>
        <Route  path="/Weekly" element={<Weekly/>}/>
        <Route path="/Daily" element={<Daily/>}/>
   </Routes>
   </>
  )
}
