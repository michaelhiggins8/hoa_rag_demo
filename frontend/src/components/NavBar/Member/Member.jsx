import React from 'react'
import "./Member.css"
import { Link } from 'react-router-dom'

export default function Member() {
  return (
    <ul className = 'nav-menu'>
    
        <li className='li-home'><Link to = "/">🏠</Link></li>
        <li className='li-1'><Link to = "/make_query?association_id=1">Dylan valley</Link></li>
        <li className='li-2'><Link to = "/make_query?association_id=2">Sun city HOA</Link></li>
        <li className='li-3'><Link to = "/make_query?association_id=3">The club HOA</Link></li>

         
        </ul>  
  )
}
