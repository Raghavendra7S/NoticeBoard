import React from 'react'
import Header from './Component/Header'
import Navigation from './Component/Navigation'
import Sidebar from './Component/Sidebar'

export default function App() {
  return (
   <>
        <div className="bg-[url('/public/todo1.jpg')] bg-cover text-black min-h-screen flex flex-col ">  
             <Header/>
    <div className="flex flex-col md:flex-row  flex-1 text-black">
        <Sidebar/>
        <Navigation/>
   
    </div>
   </div>

   </>
  )
}
