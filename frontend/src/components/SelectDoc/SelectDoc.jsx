import React from 'react'
import "./SelectDoc.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import DocSelectCard from './DocSelectCard/DocSelectCard'
export default function SelectDoc() {
  const [urlSelected,setUrlSelected] = useState(null)
  return (
    <div className='page-wrapper'>
        
          <div className='title-row'>
              <h1>Select association </h1>
              <p>Ask the A.I. assistant any questions about what is or is not allowed in the following communities</p>


          </div>
          <div className='card-row'>
              <DocSelectCard url = "/make_query?association_id=1" content = "a" setUrlSelected ={setUrlSelected} emoji = "1️⃣" urlSelected = {urlSelected} title = "Dylan valley vistas" lnk="https://drive.google.com/file/d/1gULg6CQ5HnDl4en5Xn-JvTIUZltXf2wa/view?usp=sharing"/>    
              <DocSelectCard url = "/make_query?association_id=2" content = "b" setUrlSelected ={setUrlSelected} emoji = "2️⃣" urlSelected = {urlSelected} title = "Sun city" lnk="https://drive.google.com/file/d/1mHXmX3PZw2xkcRIZVVslcLNet3tSIW7K/view?usp=sharing"/>
              <DocSelectCard url = "/make_query?association_id=3" content = "c" setUrlSelected ={setUrlSelected} emoji = "3️⃣" urlSelected = {urlSelected} title = "The club H.O.A" lnk="https://drive.google.com/file/d/1cagnqofILlrxamlZolG4ROfASiX12hmP/view?usp=sharing"/>
          </div>

          <div className='link-row'> 
              <h2><Link to ={urlSelected}>Next ➡️</Link></h2>
          </div>



    </div>

  )
}
