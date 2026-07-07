import React,{useState,useEffect,useContext} from 'react'
import { searchContext } from '../Component/Search';


export default function Daily() {
  const [weekly,setWeekly]=useState("")

  const [addedWeekly,setAddedWeekly]=useState(()=>{
    const storedTasks =
    localStorage.getItem("addedWeekly");
    
    if(!storedTasks){
      return [];
    }
   const parsedTasks = JSON.parse(storedTasks);
    const sevenDays = 24 * 60 * 60 * 1000;


    return parsedTasks.filter((weeks) => {
      const elapsed = Date.now() - weeks.created;
      return elapsed <= sevenDays;
    });
});
  

  const [Editing,setEditing]=useState(null)


   const today=new Date();
   const [stoday,setToday]=useState(today.toLocaleDateString("en-GB",{
    weekday:"long",
    day:"2-digit",
    month:"short",
    year:"numeric"
   }));

   const [update,setupdate]=useState("");
 

   const [completed, setComplete]=useState(false)
   const [priority, setPriority] = useState(false);
   
  function weeklyTask(e){
    setWeekly(e.target.value)

  }

  function handleSubmit(e){
    e.preventDefault()

    if(weekly.trim()==="") return ;


    if(Editing===null){
      setAddedWeekly([...addedWeekly,{
        weekly:weekly,
        completed:false,
        created:Date.now(),
        id:Date.now(),
        date:stoday,
        update:update,
        priority:false
      }]);
    }else{
      const modify=[...addedWeekly];
      modify[Editing]={
        ...modify[Editing],
        weekly:weekly,
       date:stoday,
        update:new Date().
        toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
     
      }
      setAddedWeekly(modify)
    }
      setWeekly("");

      
const now = new Date();

setupdate(now.toLocaleDateString("en-GB",{
  weekday:"long",
  day:"2-short",
  month:"short",
  year:"numeric"
}));
setEditing(null);
  }

  useEffect (()=>{
    localStorage.setItem("addedWeekly",JSON.stringify(addedWeekly))
  },[addedWeekly])


  function edits(indexe){
    setWeekly(addedWeekly[indexe].weekly)
    setToday(addedWeekly[indexe].date)
    
    setEditing(indexe)
  }
   

  function removeTask(indexe){
    const update=addedWeekly.filter((_, i)=>i!==indexe);
    setAddedWeekly(update);
  }

  function checkbox(index){
    const updated=[...addedWeekly]

    updated[index].priority=!updated[index].priority;

    setAddedWeekly(updated)

   

   
  }

  function removeAll() {
    console.log("onclicked")
  const selectedTasks = addedWeekly.filter(task => task.priority);

  if (selectedTasks.length < 2) {
    alert("Please select at least 2 tasks.");
    return;
  }

  if (window.confirm("Are you sure you want to delete the selected tasks?")) {
    const remainingTasks = addedWeekly.filter(task => !task.priority);
    setAddedWeekly(remainingTasks);
  }
}  

const {
  finds,
  setfindit,
serachTrigger,
setSearchTrigger,
activeSearch,
setActiveSearch

}=useContext(searchContext);

 

 return (
    <>
<div className='flex-1 p-2 md:p-4 border-2 text-black'>
  <div className="w-full box-shadow-xl rounded-xl p-4 bg-[url('\public\daily1.jpg')] bg-cover">
    <div className="form flex flex-col lg:flex-row justify-between gap-4">
          <div>
             <h2>Add The Daily Task</h2>
          </div>
          <div className="flex md:flex-col sm:flex-row p-4 gap-4  border-b-2 border-gray-500 shadow-lg">
            <form className="w-full" onSubmit={handleSubmit}>


                    <div className="flex flex-col sm:flex-row  gap-4 justify-center items-center">

                         <input type="text"
                         value={weekly}
                         maxLength={200}
                         className="p-4 w-full flex-1  border-2  border-white rounded-lg"
                         placeholder='Add_Daily_Task'
                         onChange={weeklyTask}
                         />

                          <button type="submit" className="border p-2 border-gray-300 rounded-sm w-20 h-10 ">ADD</button>


                      </div>
                      <div className="flex flex-col sm:flex-row justify-around gap-2 mt-2 ">
                          
                             <p className="text-gray-700">{weekly.length}/200</p>
                          
                         <p>
                            {new Date(stoday).toLocaleDateString("en-GB", {
                              weekday: "long",
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>

                      </div>
         
            </form>
          </div>
    </div>



    <div>
      <div className=" p-2 mt-4">
      
      <div className="flex flex-col gap-4 mt-2">
        
        <div className="flex flex-col sm:flex-row items-center  justify-between gap-4 item-start">
        
        <h1>YOUR DAILY TASKS</h1>

        <button className="border-1 border-gray-600 w-full rounded-lg sm:w-32 h-12
        cursor-pointer " onClick={removeAll} ><i className="bi bi-trash"></i> Remove All</button>


        </div>


             <ul className="Task flex flex-col gap-4 mt-2 text-black">
             
                  {addedWeekly.map((item,index)=>{
                    const modifies=Editing===index
                    const isMatch =
                    activeSearch.trim() !== "" &&
                    item.weekly.toLowerCase().includes(activeSearch.toLowerCase());
            
                    return(
                    
            <li
  key={index}
  className={`w-full rounded-xl p-4 text-white border
    ${isMatch ? "" : ""}
    ${modifies ? "border-red-500 shadow-lg" : "border-gray-800"}
  `}
>

            <div className="flex flex-col lg:flex-row justify-between gap-8">

              <div className=" flex-1 min-w-0 flex flex-col gap-3">

                <div className="flex items-start gap-3 ">
                   
                 <div>
                    <input
                      type="checkbox"
                     checked={item.priority}
                     className="w-4 h-4 "
                     onChange={(e)=>checkbox(index)}
                   /> </div>
                   <div className="flex-1 min-w-0 lg-w-80"> 
                      <p className={`text-lg break-words flex-1 ${isMatch ? "bg-black text-white px-1 rounded":""}` }>{item.weekly}</p></div>
                </div>
          
                   <div className=" ">
                     <p className="text-black"> DueDate:- {new Date(item.date).toLocaleDateString("en-GB", {
                           weekday: "long",
                           day: "2-digit",
                           month: "long",
                           year: "numeric",
                         }).replace(",", "")}</p>
                   </div>
              </div>

              <div className=" w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">    
                  <div className="">

                    <p className="text-gray-700 break-words">EditDate:-{item.update}</p>
                      

                  </div>
                  <div className=" flex flex-row lg:flex-col gap-3">
                     <button 
                        className=" flex-1 lg:w-full border border-gray-600 rounded-lg p-2 text-black font-black cursor-pointer"
                        onClick={()=>edits(index)} ><i className="bi bi-pencil"></i>Modify</button>

             
                     <button
                         className=" flex-1 lg:w-full border border-gray-600 rounded-lg p-2 text-white font-black cursor-pointer"
                         onClick={()=>removeTask(index)} > <i className="bi bi-trash2"></i> Remove</button>
                  </div>
              </div>

            </div>
            </li>
                    
              
                 ) })}  
                

             </ul>
             </div>


      </div>

          
</div>
             
        </div>
        
        
       
      
    </div>
    </>
  )
}

//  7 * 24 * 60 * 60 * 1000;

                    

                  
//                             