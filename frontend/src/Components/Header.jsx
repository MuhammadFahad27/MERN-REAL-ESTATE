import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut ,FiMoon } from 'react-icons/fi';
import {useSelector} from 'react-redux'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { signOutUser } from '../Redux Toolkit/User/userSlice';
import {useNavigate} from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { useEffect } from 'react';
import {   FiSun } from 'react-icons/fi';


const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {User} = useSelector((state)=>state?.user) ;
  
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const [searchTerm,setSearchTerm] = useState('');

  const handleSubmit = (e)=>{

    e.preventDefault() ;
    const urlParams = new URLSearchParams(window.location.search) ;
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString() ;
    navigate(`/search?${searchQuery}`)

  }

  

  

 

 
  useEffect(() => {
    
     const urlParams = new URLSearchParams(location.search) ;
      const queryUrl = urlParams.get('searchTerm')
      if(queryUrl){

        setSearchTerm(queryUrl)
      }
  }, [location.search]);


  const handleLogOut = async ()=>{
  
            try {
                 
                const response = await axios.get(import.meta.env.VITE_API_URL+`/auth/sign-out`,{withCredentials:true})
        
                const data = await response.data ;
        
                if(data.success){
                  
                  dispatch(signOutUser())
                  toast.success(data.message)
                  setSearchTerm('')
                  navigate('/sign-in')
                 
                  return ;
                  
                  
                }
              
            } catch (error) {
        
                
                toast.error(error?.response?.data?.message)
            }
            

      }
  


  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
//    
    <header className="bg-slate-950 shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
  <div className="flex items-center">
    <button 
      className="text-2xl md:hidden mr-2 text-gray-300"
      onClick={() => setSidebarOpen(true)}
    >
      <FiMenu />
    </button>

    <Link to={'/'}>
      <h1 className="hidden md:block text-xl font-bold text-gray-100">
        MERN <span className="text-blue-500">ESTATE</span>
      </h1>
    </Link>
  </div>

  <div className="flex-1 mx-4 max-w-xs">
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input 
          type="search"
          placeholder="Search..."
          className="w-full pl-3 pr-10 py-2 border border-slate-700 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500 text-sm bg-slate-800 text-gray-100 
          placeholder-gray-400 hover:bg-slate-700 transition-colors duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 text-lg cursor-pointer"
        >
          <FiSearch />
        </button>
      </form>
    </div>
  </div>

  <div className="flex items-center space-x-4">
    <div className="hidden md:flex space-x-4 text-sm font-medium text-gray-300">
      <NavLink 
        to="/" 
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 pb-1' : 'pb-1'
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 pb-1' : 'pb-1'
        }
      >
        About
      </NavLink>

      {
        !User && <NavLink 
          to="/sign-up" 
          className={({ isActive }) =>
            isActive ? 'border-b-2 border-blue-500 pb-1' : 'pb-1'
          }
        >
          Sign Up
        </NavLink>
      }
    </div>

    <div className="relative">
      <button 
        onClick={() => setProfileOpen(!profileOpen)}
        className="text-2xl text-gray-300 focus:outline-none"
      >
        <FiUser className='cursor-pointer' />
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-slate-900 shadow-lg rounded-md text-sm z-50 border border-slate-700">
          {User && (
            <div>
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-gray-200 hover:bg-slate-800"
                onClick={() => setProfileOpen(false)}
              >
                Profile
              </Link>

              <button 
                className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-slate-800"
                onClick={() => {
                  setProfileOpen(false);
                  handleLogOut();
                }}
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>

  {sidebarOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
      <div className="fixed top-0 left-0 h-full w-64 bg-slate-900 shadow-md p-6 z-50">
        <button 
          className="text-2xl text-gray-300 mb-6"
          onClick={() => setSidebarOpen(false)}
        >
          <FiX />
        </button>

        <nav className="flex flex-col space-y-4 text-gray-200 text-base font-medium">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/about" onClick={handleLinkClick}>About</Link>
          {!User && <Link to="/sign-up" onClick={handleLinkClick}>Sign Up</Link>}
        </nav>
      </div>
    </div>
  )}
</header>

  
  );
};





export default Header;
