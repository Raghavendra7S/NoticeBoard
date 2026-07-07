import React,{useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom';

import { searchContext } from './Search';


export default function Header() {
  const [dates,setDate]=useState(new Date());

  useEffect(()=>{
    const timer=setInterval(() => {
      setDate(new Date())
    }, 1000)

    return ()=> clearInterval(timer);

    },[]);
 
const {
  finds,
  setfindit,
serachTrigger,
setSearchTrigger,
   activeSearch,
      setActiveSearch

}=useContext(searchContext);

function handleSubmit(e){
  e.preventDefault();

  if(finds.trim()=== "") return;

  setActiveSearch(finds); 
  setSearchTrigger(prev=>prev+1)

 
   setfindit("");
}

  return (
   <>     
   <div className="flex p-4 border-b-1 border-gray-600 gap-4 justify-between md:flex md:flex-wrap items-center" >

    <div className="heading flex">
      <Link to="/">  <h1>NOTICES BOARD</h1></Link>
      </div>

      <div className="ser flex flex-col md:flex-row gap-4 items-center ">
        <div>
          <form onSubmit={handleSubmit}>
        <input 
        type="search"
        value={finds}  
        placeholder="serach with key word"
        className="p-2 border-1 border-gray-700"
        onChange={(e)=>setfindit(e.target.value)}
        
        />
        </form>
        </div>

        <div className="flex flex-col sm:flex-row  justify-center gap-2 ">
          <h1>Date: {dates.toLocaleDateString()}</h1>
          <h1>Time: {dates.toLocaleTimeString()}</h1>
        </div>

      </div>

     
</div>

     
    </>

  )
}

