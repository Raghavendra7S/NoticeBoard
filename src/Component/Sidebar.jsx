import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [mQuote,setMQuote]=useState("The only way to do great work is to love what you do.")

  const [editing,setEditing]=useState(false)

  const [__________, set__________] = useState("");
const [newQuote, setNewQuote] = useState("");
 

  function handleEdit(){
    
   setEditing(true)
   set______(___);
  }

  function handleSave(){
   
          if (newQuote.trim() === "") {
    return; // Do nothing, keep the previous quote
  }

    
      setMQuote(__________)
      setEditing(false);
    setNewQuote("");
      setMQuote(newQuote);
   
  }

useEffect(() => {
  const storedQuote = localStorage.getItem("mQuote");

  if (storedQuote) {
    setMQuote(storedQuote);
  }
}, []);


useEffect(() => {
  localStorage.setItem("mQuote", mQuote);
}, [mQuote]);


 function handleCancel(){
  setEditing(false)
  setNewQuote("");
 }
 
  return (
    <>
    
  <div className="w-full lg:w-72 md:w-64  min-h-screen  p-4 ">
    <div className="flex flex-col  sm:gap-20  md:gap-35 lg:gap-40 min-h-screen ">
      <div className="navigation ">
        <ul className="flex flex-col gap-4  p-2 flex-grow font-bold">
            <div>
                <li>
                   <Link to="/Daily">
                       DAILY
                    </Link>
                </li>
            </div>

            <div>
                <li >
                    <Link to="/Weekly">  WEEKLY </Link>
                </li>
            </div>
          <div>
              <li>
                  <Link to="/Monthlys">
                  MONTHLY</Link>
              </li>
           </div>

        </ul>
      </div>
    


    <div className="flex flex-col gap-4 bg-gray-00 border-b bg-black border-t border-l border-r border-t-solid border-b-solid [border-left-style:dashed] [border-right-style:dashed] p-2">
      <div className="border-b [border-bottom-style:dashed] border-white p-2">
        <h1 className="text-gray-400">Add your daily Quote</h1>
      </div>
                <div>
                    <p className="text-white">{mQuote}</p>      
                </div>     
      <div>
        <div>
            {!editing ? (
              <button onClick={()=>setEditing(!editing)} className="border-1 border-gray-800 w-full text-white rounded-lg smw-32 h-12 cursor-pointer mt-2">Edit</button>)
              
              :(
                <div className="flex flex-col gap-2">
                  <div>
                      <textarea
                      maxLength={200}
                       value={newQuote}
                       className="w-full p-2 text-white border-1 border-gray-600 rounded-sm text-xl hover:bg-white 
                       hover:text-black text-sm"
                       onChange={(e) => setNewQuote(e.target.value)}/>
                  </div>
                  <div>
                    <p className="text-gray-200">{newQuote.length}/200</p>
                    </div>
                  
                    <div className="flex gap-2 text-white">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                     </div>
                    
                  </div>
              )

            }
        </div>
        
      </div>
    </div>
    </div>
  </div>

    
    
    </>
  )
}
