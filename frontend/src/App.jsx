import React, { useEffect, useState } from 'react'
import {BrowserRouter,Navigate,Route,Routes ,useNavigate} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Listing from './Pages/Listing';

import UserListing from './Pages/UserListing';
import ListingDetails from './Pages/ListingDetails';
import Search from './Pages/Search';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { signOutUser } from './Redux Toolkit/User/userSlice';
import Spinner from './Components/Spinner';



const App = () => {

   
 
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    const [loading , setLoading] = useState(false) ;
    

   
    useEffect(() => {
      const checkAuth = async()=>{

      try {

        setLoading(true)
        const response = await axios.get(import.meta.env.VITE_API_URL+'/auth/check',{withCredentials:true}) ;

        if(!response?.data?.isAuthenticated){
          navigate('/sign-in')
          dispatch(signOutUser()) ;
          setLoading(false)
        }
        
       
      } catch (error) { 

          console.log(error)
          setLoading(false)
       
      }
      finally{

        setLoading(false)

      }
    }
    checkAuth() ;
  }, [])

  if (loading) {
    return <Spinner/>
  }
  else{
    
  return <>
    <Header />
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/list-details/:listId' element={<ListingDetails/>}/>
      <Route path='/search' element={<Search/>}/>



      <Route  element={<PrivateRoute/>}>

        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-listing' element={<Listing/>}/>
        <Route path='/listing' element={<UserListing/>}/>

      



      
      </Route>


    
    </Routes>
    <Footer/>
    <ToastContainer 
      position="top-right" 
      autoClose={3000} 
      theme="dark"  // or "light"
      hideProgressBar={false} 
    />
    </>
  }
  

  
   
   
}

export default App
