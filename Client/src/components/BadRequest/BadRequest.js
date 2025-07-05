import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'


const BadRequest = ({route}) => {
    const navigate = useNavigate()
  return (
    <div className='bad-request'>
        <div className='bad-header'>
            <h1>Bad Request</h1>
            <button onClick={()=>navigate(`${route}`)} className='btn btn-dark'>Go Home</button>
        </div>
      
    </div>
  )
}

export default BadRequest
