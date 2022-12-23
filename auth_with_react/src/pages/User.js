import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const User = () => {
  const location = useLocation
  const auth = useSelector((state)=>state.auth)
  const navigate = useNavigate()
 
  useEffect(()=>{
if(!auth.id){
navigate("/")
}
  },[])
  return (
    <div>{auth.userName}</div>
  )
}

export default User