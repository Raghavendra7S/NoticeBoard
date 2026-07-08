import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'

import Weekly from '../pages/Weekly'
import Daily from '../pages/Daily'
import Monthlys from '../pages/Monthlys'

export default function Navigation() {
  return (
   <>
   <Routes>
        <Route path="/" className="" element={<Home/>}/>
        <Route path="/Monthlys" element={<Monthlys/>}/>
        <Route  path="/Weekly" element={<Weekly/>}/>
        <Route path="/Daily" element={<Daily/>}/>
   </Routes>
   </>
  )
}
