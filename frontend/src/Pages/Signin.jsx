import React from 'react'
import { useForm } from 'react-hook-form';
import { Link ,useNavigate } from 'react-router-dom';
import axios from "axios"
import {toast} from "react-toastify"
import { useState } from 'react';
import Spinner from '../Components/Spinner';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInFailure ,signUpStart ,signUpSuccess } from '../Redux Toolkit/User/userSlice';


const Signin = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    
    const dispatch = useDispatch() ;
    const navigate = useNavigate();
    const {loading} = useSelector((state)=>state?.user)
  
    const onSubmit = async(formData) => {

      const {email,password} = formData

      
          try {
      
              dispatch(signUpStart())
              const response = await axios.post(import.meta.env.VITE_API_URL+'/auth/sign-in',{
      
               
                email,
                password ,
                
              } ,{withCredentials:true})
      
              const data = await response.data ;
      
              if(data.success){
      
                toast.success(data.message) 
                dispatch(signUpSuccess(data.user))
                navigate('/home')
              }
            
          } catch (error) {
      
             dispatch(signInFailure())
              toast.error(error?.response?.data?.message)
          }
          finally{
      
            dispatch(signInFailure()) ;
          }
         

    };
  
 return (
  <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
    <div className="bg-gray-900 shadow-lg rounded-lg p-6 w-full max-w-md">
      <h1 className="text-3xl font-semibold text-center text-indigo-100 mb-6">
        MERN <span className="text-blue-500">ESTATE</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full p-3 rounded-md bg-slate-800 border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 text-white`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`w-full p-3 rounded-md bg-slate-800 border ${
              errors.password ? 'border-red-500' : 'border-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 text-white`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md
          cursor-pointer active:scale-95 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? <Spinner /> : 'Sign in '}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-indigo-400 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  </div>
);

}

export default Signin
