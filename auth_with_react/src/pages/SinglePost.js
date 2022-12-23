import React from 'react'
import { useLocation } from 'react-router-dom'

const Post = () => {
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  console.log(path)
  return (
    <div>
        post
    </div>
  )
}

export default Post