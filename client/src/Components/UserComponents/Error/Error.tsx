import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Error.css'

const Error: React.FC = () => {
      
    const navigate = useNavigate()

    function handleGoHome():void {
      navigate('/home')
    }
  
    return (
      <div className='not-found-container'>
          <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! Page Not Found</p>
        <p className="not-found-description">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <button className="not-found-button" onClick={handleGoHome}>
          Go to Homepage
        </button>
      </div>
    )
}

export default Error
