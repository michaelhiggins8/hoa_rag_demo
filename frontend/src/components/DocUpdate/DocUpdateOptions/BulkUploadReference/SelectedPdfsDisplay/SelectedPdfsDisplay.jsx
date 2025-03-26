import React from 'react'
import "./SelectedPdfsDisplay.css"
export default function SelectedPdfsDisplay({name,size}) {
  return (
    <div className='pdf-display'>
            <div>
            <span>📁 <h3 style={{ display: 'inline' }}>{name}</h3> <button>❌</button></span>

            </div>
            
            <h4>{(size/1024).toFixed(2)}KB</h4>

    </div>
  )
}
