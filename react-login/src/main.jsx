
import ReactDOM from 'react-dom/client'

import {BrowserRouter, Routes, Route} from "react-router-dom";

import './index.css'

import Album from './Album';
import Login from './Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          {/* <Route path='/register' element={<Register/>}/> */}
          <Route path='/album' element={<Album/>} />
      </Routes>
  </BrowserRouter>
)
