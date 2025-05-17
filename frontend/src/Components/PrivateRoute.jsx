import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom'

export default function PrivateRoute() {

    const {User} = useSelector((state)=>state?.user)
    
  return (User ? <Outlet/>  : <Navigate to={'sign-in'}/>)
}
