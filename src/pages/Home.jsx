import React,{useState,useEffect, useContext} from 'react'
 
import { searchContext } from '../Component/Search';


export default function Home() {
  const [task,setTask]=useState("")

  

  const [addedTask,setAddtask]=useState(()=>{
    const storedTasks=localStorage.getItem("addedTask");
    return storedTasks ? JSON.parse(storedTasks) :[];
  });

  const [isEditing,setIsEditing]=useState(null)


const [completed, setComplete]=useState(false)
const [priority, setPriority] = useState(false);

const today=new Date();
const [date, setDate] = useState( 
    today.toISOString().split("T")[0]
);
const [time, setTime] = useState(
  
 today.toTimeString().slice(0, 5)
);
const [update,setUpdate]=useState("");
const [updateTime,setupdateTime]=useState("");

  function onChange(e){
    setTask(e.target.value)


  }



  function handleSubmit(e){
    e.preventDefault()

    if(task.trim()==="") return;

    if(isEditing===null){
    setAddtask([...addedTask,{
    task:task,
    // priority:priority,
    completed:false,
    date:date,
    time:time,
    update:update,
    updateTime:updateTime
},
]);
    }
    
    else{
        const updated = [...addedTask];
    updated[isEditing] = {
      ...updated[isEditing],
      task:task,
     
      date:date,
      time:time,
     
      update: new Date().toLocaleDateString(),
     updateTime:new Date().toLocaleTimeString()
    };
    setAddtask(updated);
    }
       
    
setTask("");

const now = new Date();

setDate(now.toISOString().split("T")[0]);
setTime(now.toTimeString().slice(0, 5));

setIsEditing(null);
 
 
  }
  
  function edit(ind){
    setTask(addedTask[ind].task)
    // setPriority(addedTask[ind].priority);
    setDate(addedTask[ind].date)
    setTime(addedTask[ind].time)
    setIsEditing(ind);
  }


  useEffect(()=>{
    localStorage.setItem("addedTask",JSON.stringify(addedTask))
  },[addedTask])
  
  



  function removeTask(ind){
    const update=addedTask.filter((_, i)=>i!==ind);
    setAddtask(update);
  }

 
  function checkbox(index){
    const updated=[...addedTask]

    updated[index].priority=!updated[index].priority;

    setAddtask(updated)

   

   
  }

 function removeAll() {
    console.log("onclicked")
  const selectedTasks = addedTask.filter(task => task.priority);

  if (selectedTasks.length < 2) {
    alert("Please select at least 2 tasks.");
    return;
  }

  if (window.confirm("Are you sure you want to delete the selected tasks?")) {
    const remainingTasks = addedTask.filter(task => !task.priority);
    setAddtask(remainingTasks);
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

// const searched= addedTask.filter((ser)=>
//    ser.task.toLowerCase().includes(finds.toLowerCase())


// )




return (
    <>
  

    <div className="flex-1 p-2  md:p-4">
    <div className=" w-full 
     box-shadow-md rounded-xl 
      p-4  
      bg-[url('/home.jpg')] 
      bg-cover "
    
      >
      
      <div className="form flex  flex-col lg:flex-row justify-between  gap-4">
        <h2>Add The New Task</h2>
           <form className="w-full" onSubmit={handleSubmit}>

              <div className=" border-b-1 border-gray-600  shadow-2  gap-2  p-4 flex flex-col gap-4 justify-center">

                <div className="flex flex-col sm:flex-row  gap-4 justify-center text-white">

                   <input 
                   type="text"

                   className="p-4 w-full flex-1 border-2  border-white rounded-lg"  
                    placeholder='add your daily task'
                    value={task}
                    maxLength={100}
                    onChange={onChange}
                     />
                    
                     <button type="Submit" className="border-1 border-gray-600 w-full
                     sm:w-40 h-12  rounded-md hover:bg-gray-600  cursor-pointer gap-3 border-gray-400">Submit</button>
                  </div>
                  <div>
                    <p className={`${task.length === 100 ? "text-red-500" : "text-gray-400"} text-sm`}>
                     {task.length}/100 characters
                    </p>
                  </div>
                  <div>
                       <div className="flex  flex-col sm:flex-row
                       gap-3">          
                      <input 
                       type="date"
                       value={date}
                       className="p-2 text-white border-1 border-gray-600 rounded-sm text-xl hover:bg-white hover:text-black"
                       onChange={(e)=>setDate(e.target.value)}
                       />
                       <input 
                       type="time"
                       value={time}
                        className="p-2 text-white border-1 border-gray-600 rounded-sm text-xl hover:bg-white hover:text-black "
                       onChange={(e)=>setTime(e.target.value)}
                       />
                  </div>
                </div>

              </div>
           </form>
      </div>
      
    
      
      <div className=" p-2 mt-4">
      
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-white">
        <h1>YOUR TASKS</h1>
        <button className="border-1 border-gray-600 w-full rounded-lg sm:w-32 h-12
        cursor-pointer hover:bg-white hover:text-black hover:font-bold" onClick={removeAll}><i className="bi bi-trash"></i> Remove All</button>
        </div>
             <ul className="Task flex flex-col gap-4 mt-2">
             
                  {addedTask.map((item,index)=>{
                    const EditingMatch=isEditing=== index;
                    const isMatch =
                    activeSearch.trim() !== "" &&
                    item.task.toLowerCase().includes(activeSearch.toLowerCase()
                
                  );

                      return(

                         <li
  key={index}
  className={`w-full rounded-xl p-4 text-white border
    ${isMatch ? "bg-black text-white" : ""}
    ${EditingMatch ? "border-blue-500 bg-gray-800  shadow-lg" : "border-gray-800"}
  `}
>
            <div className="flex flex-col sm:flex-row justify-between gap-4 "> 

              <div className="flex-1 min-w-0">

                   <div className="flex gap-2">
                    
                
                    <input
                      type="checkbox"
                     checked={item.priority}
                     className="w-4 h-4 "
                     onChange={(e)=>checkbox(index)}
                   /> 
                      <h6
  className={`text-lg break-words flex-1 ${isMatch ? "bg-black text-white px-1 rounded" : ""}
  `}
>
  {item.task}
</h6>
                  </div>
          
                   <div className="flex flex-wrap mt-2
                   gap-4 ">
                     <p className="text-gray-200 whitespace-nowrap" > DueDate:-{item.date}</p>
                     <p className="text-gray-200 whitespace-nowrap">DueTime:-{item.time}</p>

                   </div>
              </div>

              <div className="flex flex-col gap-1 min-w-[170px]">    
                  <div className="flex flex-col gap-2">
                      <p className="text-gray-400 text-2 ">EditTime:-{item.updateTime}</p>
                      <p className="text-gray-400 whitespace-nowrap">EditDate:-{item.update}</p>
                  </div>
                  <div className="flex flex-wrap  gap-2 flex-wrap">
                     <button 
                        className=" p-2 w-full sm:w-28 h-10 border-1 border-gray-600 rounded-lg text-green-500 flex gap-2 cursor-pointer"
                        onClick={()=>edit(index)} ><i class="bi bi-pencil"></i>Modify</button>

             
                     <button
                         className=" p-2 w-full sm:w-28 h-10 border-1 border-gray-600 rounded-lg text-red-500 flex gap-2 cursor-pointer"
                         onClick={()=>removeTask(index)}> <i class="bi bi-trash2"></i> Remove</button>
                  </div>
              </div>
            </div>
            </li>
                    

                ) } )}
                    
                  
              
            
            </ul>
             </div>


      </div>

       
    </div>
    </div>

                  

    </>
  )
}

        
         
  

            



    
