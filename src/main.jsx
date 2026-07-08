import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap-icons/font/bootstrap-icons.css';
import {Search} from './Component/Search'

createRoot(document.getElementById('root')).render(
<BrowserRouter basename={import.meta.env.BASE_URL}>
<Search>
   <StrictMode>
   <App/>
  </StrictMode>
  </Search>
  </BrowserRouter>,
 

)
