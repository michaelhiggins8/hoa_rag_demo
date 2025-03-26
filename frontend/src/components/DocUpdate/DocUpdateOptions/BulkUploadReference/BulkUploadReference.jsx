import React from 'react'
import { useState } from 'react'
import "./BulkUploadReference.css"
import SelectedPdfsDisplay from './SelectedPdfsDisplay/SelectedPdfsDisplay';
export default function BulkUploadReference() {
    


const [pdf,setPdf] = useState([]);
    

const sendPdf = async()=>{

    const formData = new FormData();

    for (let i = 0; i<pdf.length;i++){

        formData.append("pdf",pdf[i])

    }


    formData.append("association_id",3)

    const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/sendPdf",{

        method: "POST",
        body:formData,
         credentials: "include"


    })

    const data = await response.json();
    console.log(data);





}











  return (
    <div className='upload-docs-page'>
        
        <div className='upload-docs-center-card'>

            <h1>Upload community documents</h1>
            <div className='file-upload-input-wrapper'>
                <input type = 'file' multiple onChange={(event)=>setPdf( [...pdf,...Array.from(event.target.files)]) } accept='application/pdf'></input>
            </div>
            <div className='upload-doc-pdf-display'>
                  {pdf.map(item => <><SelectedPdfsDisplay name = {item.name} size = {item.size}/></>)}
            </div>
            <div className='bottom-section-doc-upload'>
                <button onClick={()=>sendPdf()}>Send PDF</button>
                

            </div>
        </div>
  
    
    
    </div>
    
  )
}
