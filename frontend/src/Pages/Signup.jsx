import React from 'react';
import { useForm } from 'react-hook-form';
import { Link ,useNavigate} from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../Components/Spinner';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading,setLoading] = useState(false) ;
  const navigate  = useNavigate() ;

  const onSubmit = async(formData) =>{

    const {username,email,password,confirmPassword} = formData ;

    try {

        setLoading(true) ;
        const response = await axios.post(import.meta.env.VITE_API_URL+'/auth/sign-up',{

          username ,
          email,
          password ,
          confirmPassword 
        })

        const data = await response.data ;

        if(data.success){

          toast.success(data.message) 
          navigate('/sign-in')
        }
      
    } catch (error) {

        setLoading(false)
        toast.error(error?.response?.data?.message)
    }
    finally{

      setLoading(false)
    }
   


  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
      <h1 className="text-3xl font-semibold text-center text-indigo-400 mb-6">
        MERN <span className="text-indigo-600">ESTATE</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`w-full p-3 rounded-md bg-slate-700 border ${
              errors.username ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 text-white`}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <span className="text-sm text-red-500">{errors.username.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full p-3 rounded-md bg-slate-700 border ${
              errors.email ? 'border-red-500' : 'border-gray-600'
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
            className={`w-full p-3 rounded-md bg-slate-700 border ${
              errors.password ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 text-white`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`w-full p-3 rounded-md bg-slate-700 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 text-white`}
            {...register('confirmPassword', { required: 'Confirm Password is required' })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md
          cursor-pointer active:scale-95 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Sign up '}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-indigo-400 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  </div>
);

};

export default Signup;
