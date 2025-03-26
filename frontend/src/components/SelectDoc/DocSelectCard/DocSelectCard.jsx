import React from 'react'
import "./DocSelectCard.css"
import { Link } from 'react-router-dom'

export default function DocSelectCard({url,content,setUrlSelected,emoji,urlSelected,title,lnk}) {
  return (

   
    <div onClick={()=>setUrlSelected(url)} className='select-card'>



             <h1 className='emoji'>{emoji}</h1>
             <h1 className='card-title'>{title}</h1>
            <a href={lnk} target="_blank" rel="noopener noreferrer"> Read</a>
            <p>Select here to ask anything about the rules in {title}</p>
            <h1 className='select-button'>{url == urlSelected ? "🔵" : "⚪"}</h1>

    
    
        





    </div>
  )
}
