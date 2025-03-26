import React from 'react'
import "./QueryCard.css"
import { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function QueryCard() {
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const association_id = searchParams.get('association_id');
    console.log("association_id",association_id)
    


const [query,setQuery] = useState(null);
const [completion,setCompletion] = useState(" ");
const [queryHistory,setQueryHistory] = useState([])
const [chatBegan,setChatBegan] = useState(false);
const [loading,setLoading] = useState(false);









const makeQuery = async (suggestionNum) =>{
  
setLoading(true)

 let whatWeWillSend = query
if (suggestionNum == 1){

whatWeWillSend = "Can I have a 7000 foot tall fence";
}else if (suggestionNum == 2){

  whatWeWillSend ="How many pets can I have?";
}else if (suggestionNum == 3){

  whatWeWillSend = "Are guests allowed to sleep in cars?";
}else if (suggestionNum == 4){
  whatWeWillSend="Can my dog run for the board?";
  
}


  let sentQuery = whatWeWillSend;
console.log(whatWeWillSend)
  
const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/makeQuery",{


    method:'POST',
    headers: {  "Content-Type": "application/json"},
    body: JSON.stringify({"query":whatWeWillSend, association_id }),
     credentials: "include"
    
    
    
      });


const data = await response.json();
setChatBegan(true);
setQueryHistory([...queryHistory,{role: 'user',content:sentQuery},{role: 'assistant',content:data.message}]);

setCompletion(data.message);
setLoading(false)








}




useEffect(()=>{

  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });


},[queryHistory]);




const handleSuggestion =  (suggestionNum) => {







  
  makeQuery(suggestionNum);



   


};






  return (
<div>

  <div className='maincolumn'>
      <div className='chat-content-ui'>

      {loading && <span className="spinner">🔄</span>}
      {queryHistory.map(item => <><div className= {item.role == 'user' ? "user-style" : "assistant-style" }> <p >  {item.content} </p></div><br/></>)}

          <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
      </div>

    
      <div className= {chatBegan ? 'inputs-continer-chat-started' : 'inputs-continer-chat-not-started'}>
              
          
             {!chatBegan && <h1>Understand your community</h1>} 
              
                <textarea
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="Type something..."
                    rows={1} 
                    className='textArea'
                    
                  />
                  <div className='make-query-button-wrapper'>
                      <button onClick={()=>makeQuery(null)}>⬆️</button>
                  </div>

                {!chatBegan && 
                <div className='suggestions'>
                    <div className='suggestion-box' onClick={() =>handleSuggestion(1)}> Can I have a 7000 foot tall fence</div>
                    <div className='suggestion-box' onClick={() =>handleSuggestion(2)}> How many pets can I have?</div>
                    <div className='suggestion-box'onClick={() =>handleSuggestion(3)}> Are guests allowed to sleep in cars?</div>
                    <div className='suggestion-box'onClick={() =>handleSuggestion(4)}> Can my dog run for the board?</div>
                </div>
                  }
      </div>





  </div>
        
     

</div>
  )
}
