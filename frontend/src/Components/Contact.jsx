import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';

const Contact = ({contact,setContact , emailAddress}) => {
  const { register, handleSubmit, reset } = useForm()
  const [open,setOpen] = useState(false) ;

  
  const onSubmit = (data) => {
  const { subject, message } = data
  const gmailURL = `mailto:${emailAddress}?subject=Regarding ${subject} &body=${message}`
  window.open(gmailURL, '_blank')
  reset()
  
}
    
  



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Contact Owner</h2>
          <button
            className="text-black hover:text-red-500 text-xl font-bold"
            onClick={()=>setContact(!contact)}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-black font-medium">Subject</label>
            <input
              type="text"
              {...register('subject', { required: true })}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              {...register('message', { required: true })}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter message"
              
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-black p-2 rounded hover:bg-blue-700 transition"
          >
            Contact Seller
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
