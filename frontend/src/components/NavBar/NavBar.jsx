import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import "./NavBar.css";
import Member from './Member/Member.jsx';
export default function NavBar() {




const [userStatus,setUserStatus] = useState(null);





useEffect(()=>{

  const queryUserProfile = async() =>{
    const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/queryUserProfile",{


      method:'GET',
      headers: {'Content-Type': 'application/json'},
    credentials:'include'
      });


      const data = await response.json();
      setUserStatus(data.message);
      console.log(data);

  }


  queryUserProfile();


},[])





  

  return (
    
    
    
    <div>

        <nav className='nav-bar'>
            
          
                <Member />
          

        </nav>


    </div>





  )
}
