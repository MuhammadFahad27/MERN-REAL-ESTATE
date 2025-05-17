import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { FaUserCircle, FaPen, FaEnvelope, FaLock, FaPlus, FaTrash } from 'react-icons/fa'
import {useNavigate,Link} from 'react-router-dom'
import axios from "axios"
import {toast} from 'react-toastify'
import { useDispatch , } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateProfilesFailure, updateProfileStart, updateProfileSuccess } from '../Redux Toolkit/User/userSlice';
import Spinner from './Spinner';


const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { User } = useSelector((state) => state.user)
    const id = User._id 
    const dispatch = useDispatch() ;
    const {loading} = useSelector((state)=>state.user)
    const navigate = useNavigate() ;
    const [isdelete,setDelete] = useState(false) ;

    const handleDelete = ()=>{

        setDelete(true)
    } 
    
    

    const onSubmit = async(formData) => {

      const {username,email,password} = formData 


      
          try {
                dispatch(updateProfileStart())
              const response = await axios.put(import.meta.env.VITE_API_URL+`/user/update-profile/${id}`,{
      
               username ,
                email,
                password ,
                
              } ,{withCredentials:true})
      
              const data = await response.data ;
      
              if(data.success){
      
                toast.success(data.message)
                dispatch(updateProfileSuccess(data.user))
                return ;
                
                
              }
            
          } catch (error) {
      
              
              toast.error(error?.response?.data?.message)
          }
          finally{

                dispatch(updateProfilesFailure())
          }
        


    }
    const handleCreateListing = () => navigate('/create-listing')
    const handleDeleteAccount = async() => {

           try {

                dispatch(deleteUserStart())
                dispatch(updateProfileStart())
                const response = await axios.delete(import.meta.env.VITE_API_URL+`/user/delete-account/${id}` ,{withCredentials:true})
      
              const data = await response.data ;
      
              if(data.success){
                
                dispatch(deleteUserSuccess())
                setDelete(false)
                navigate('/')
                toast.success(data.message)
                dispatch()
                return ;
                
                
              }
            
          } catch (error) {
            
            dispatch(deleteUserFailure())
              toast.error(error?.response?.data?.message)
          }
          finally{

                dispatch(deleteUserFailure())
          }
    }

  return (
  <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <FaUserCircle className="h-24 w-24 text-gray-400" />
          <button className="absolute bottom-0 right-0 bg-indigo-700 rounded-full p-2 hover:bg-indigo-800 transition duration-200">
            <FaPen className="h-5 w-5 text-white" />
          </button>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-100 sm:text-3xl">
          {User.username}
        </h1>
      </div>

      {/* Profile Form */}
      <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md py-2 px-4 border bg-gray-900 text-gray-100"
                  placeholder={User.username}
                  defaultValue={User.username}
                  {...register('username')}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md py-2 px-4 border bg-gray-900 text-gray-100"
                  placeholder={User.email || "your@email.com"}
                  defaultValue={User.email}
                  {...register('email')}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="sm:col-span-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md py-2 px-4 border bg-gray-900 text-gray-100 cursor-pointer"
                  placeholder="••••••••"
                  {...register('password')}
                />
              </div>
            </div>
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleCreateListing}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 cursor-pointer"
              >
                <FaPlus className="mr-2 h-4 w-4" />
                Create Listing
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 cursor-pointer"
                to={'/listing'}
              >
                <button
                  type="button"
                  onClick={handleCreateListing}
                >
                  Show Listing
                </button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 cursor-pointer"
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Update profile'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 cursor-pointer"
              >
                <FaTrash className="mr-2 h-4 w-4" />
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    {/* delete functionality  */}
    {isdelete && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80">
        <div className="bg-gray-800 rounded-lg shadow-lg max-w-sm w-full p-6 relative text-gray-100">
          {/* Close Icon */}
          <button
            onClick={() => setDelete(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 cursor-pointer"
          >
            ❌
          </button>

          {/* Modal Content */}
          <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
          <p className="mb-6 text-gray-300">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setDelete(false)}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800 transition cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )}
  </main>
);

}

export default Profile