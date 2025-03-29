import React from 'react'
import { Link } from 'react-router-dom';
import {useState } from 'react';
import "./NavBar.css";
import Member from './Member/Member.jsx';
export default function NavBar() {




const [userStatus,setUserStatus] = useState(null);



  

  return (
    
    
    
    <div>

        <nav className='nav-bar'>
            
          
                <Member />
          

        </nav>


    </div>





  )
}
