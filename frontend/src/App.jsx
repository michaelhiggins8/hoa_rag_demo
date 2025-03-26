import MakeQuery from "./components/MakeQuery/MakeQuery"
import SelectDoc from "./components/SelectDoc/SelectDoc"
import {Routes,Route,BrowserRouter} from "react-router-dom"
import  Navbar from "./components/NavBar/NavBar"
import BulkUploadReference from"./components/DocUpdate/DocUpdateOptions/BulkUploadReference/BulkUploadReference"
import './App.css';

function App() {

  return (
    <>
       

      
      <BrowserRouter>
      <Navbar/>
          <div className="body-content">
          <Routes >
          <Route path = "/" element = {<SelectDoc/>}></Route>
            <Route path = "/make_query" element = {<MakeQuery/>}></Route>
            <Route path = "/bulk_upload" element = {<BulkUploadReference/>}></Route>


            
          </Routes>  
          </div> 
      
      
      
      </BrowserRouter>     
    </>
  )
}

export default App
