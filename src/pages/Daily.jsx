import React,{useState,useEffect,useContext} from 'react'
import { searchContext } from '../Component/Search';


export default function Daily() {
  const [day,setday]=useState("")

  const [fordays,setfordays]=useState(()=>{
    const storedTasks =
    localStorage.getItem("fordays");
    
    if(!storedTasks){
      return [];
    }
   const parsedTasks = JSON.parse(storedTasks);
    const oneDays = 24 * 60 * 60 * 1000;


    return parsedTasks.filter((weeks) => {
      const elapsed = Date.now() - weeks.created;
      return elapsed <= oneDays;
    });
});
  

  const [Editing,setEditing]=useState(null)


   const today=new Date();
   const [sday,setdays]=useState(today.toLocaleDateString("en-GB",{
    weekday:"long",
    day:"2-digit",
    month:"short",
    year:"numeric"
   }));

   const [update,setupdate]=useState("");
 

  
   
  function dayTask(e){
    setday(e.target.value)

  }

  function handleSubmit(e){
    e.preventDefault()

    if(day.trim()==="") return ;


    if(Editing===null){
      setfordays([...fordays,{
        day:day,
        completed:false,
        created:Date.now(),
        id:Date.now(),
        date:sday,
         update: "",
  priority: false,
        
      }]);
    }else{
      const modify=[...fordays];
      modify[Editing]={
        ...modify[Editing],
        day:day,
       date:sday,
        update:new Date().
        toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
     
      }
      setfordays(modify)
    }
      setday("");

      
const now = new Date();

setupdate(now.toLocaleDateString("en-GB",{
  weekday:"long",
  day:"2-digit",
  month:"short",
  year:"numeric"
}));
setEditing(null);
  }

  useEffect (()=>{
    localStorage.setItem("fordays",JSON.stringify(fordays))
  },[fordays])


  function edits(indexe){
    setday(fordays[indexe].day)
    setdays(fordays[indexe].date)
    
    setEditing(indexe)
  }
   

  function removeTask(indexe){
    const update=fordays.filter((_, i)=>i!==indexe);
    setfordays(update);
  }

  function checkbox(index){
    const updated=[...fordays]

    updated[index].priority=!updated[index].priority;

    setfordays(updated)

   

   
  }

  function removeAll() {
    console.log("onclicked")
  const selectedTasks = fordays.filter(task => task.priority);

  if (selectedTasks.length < 2) {
    alert("Please select at least 2 tasks.");
    return;
  }

  if (window.confirm("Are you sure you want to delete the selected tasks?")) {
    const remainingTasks = fordays.filter(task => !task.priority);
    setfordays(remainingTasks);
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
<div className='flex-1 p-2 md:p-4  text-white'>
  <div className="w-full box-shadow-xl rounded-xl p-4 bg-[url('/daily.jpg')] bg-cover">
    <div className="form flex flex-col lg:flex-row justify-between gap-4">
          <div>
             <h2>Add The Daily Task</h2>
          </div>
          <div className="flex md:flex-col sm:flex-row p-4 gap-4  border-b-2 border-gray-500 shadow-lg">
            <form className="w-full" onSubmit={handleSubmit}>


                    <div className="flex flex-col sm:flex-row  gap-4 justify-center items-center text-white">

                         <input type="text"
                         value={day}
                         maxLength={200}
                         className="p-4 w-full flex-1  border-2 hover:border-4  border-white rounded-lg"
                         placeholder='Add_Daily_Task'
                         onChange={dayTask}
                         />

                          <button type="submit" className="border p-2 border-gray-300 rounded-sm w-20 h-10 cursor-pointer ">ADD</button>


                      </div>
                      <div className="flex flex-col sm:flex-row justify-around gap-2 mt-2 ">
                          
                             <p className="text-gray-700">{day.length}/200</p>
                          
                         <p>
                            {new Date(sday).toLocaleDateString("en-GB", {
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
             
                  {fordays.map((item,index)=>{
                    const modifies=Editing===index
                    const isMatch =
                    activeSearch.trim() !== "" &&
                    item.day.toLowerCase().includes(activeSearch.toLowerCase());
            
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
                     checked={!!item.priority}
                     className="w-4 h-4 "
                     onChange={(e)=>checkbox(index)}
                   /> </div>
                   <div className="flex-1 min-w-0 lg-w-80"> 
                      <p className={`text-lg break-words flex-1 ${isMatch ? "bg-black text-white px-1 rounded":""}` }>{item.day}</p></div>
                </div>
          
                   <div className=" ">
                     <p className="text-white"> DueDate:- {new Date(item.date).toLocaleDateString("en-GB", {
                           weekday: "long",
                           day: "2-digit",
                           month: "long",
                           year: "numeric",
                         }).replace(",", "")}</p>
                   </div>
              </div>

              <div className=" w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">    
                  <div className="">

                    <p className="text-gray-300 break-words">EditDate:-{item.update}</p>
                      

                  </div>
                  <div className=" flex flex-row lg:flex-col gap-3">
                     <button 
                        className=" flex-1 lg:w-full border border-gray-200 rounded-lg p-2 text-white font-black cursor-pointer"
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