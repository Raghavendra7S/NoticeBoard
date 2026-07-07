import {createContext,useState} from 'react';


export const searchContext=createContext();

export  function Search({children}) {

  const [finds,setfindit]=useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [serachTrigger,setSearchTrigger]=useState(0);


  return (
    <>
    <searchContext.Provider value={{
      finds,
      setfindit,
      serachTrigger,
      setSearchTrigger,
      activeSearch,
      setActiveSearch
    }}>

      {children}
    </searchContext.Provider>
    </>
  );
}
