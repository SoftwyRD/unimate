import React from 'react'
import { useNavigate } from 'react-router-dom'

const Testing = () => {
  const navigate = useNavigate()
  return (
    <div>
        <h1>Probaste correctamente el access Token o Actualizaste</h1>
        <button onClick={() => navigate('/main')}>Main</button>
    </div>
  )
}

export default Testing