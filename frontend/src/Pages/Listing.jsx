import React from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import  {useState} from 'react';
import {toast} from 'react-toastify'
import axios from 'axios'
import {useSelector} from 'react-redux'
import Spinner from '../Components/Spinner';




const Listing = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset 

    } = useForm();

    const offer = watch('offer')
    const image = watch('image')
    const [loading , setLoading] = useState(false) ;
    const id = useSelector((state)=>state.user.User._id)


    const onSubmit = async(formData) => {

        
        
        if(formData.sale && formData.rent){

            toast.error('Sale & rent can not choose at a time ');
            return ;
        }
        
        if(Number(formData.discount) && (Number(formData.discount )>= Number(formData.regularPrice))){

            toast.error('Discount should be less then sale price  ');
            return ;
        }

        

        if(offer && !formData.discount){

            toast.error('if you choose offer then give offer other wise remove it ')
            return 
        }
        
        const Data = new FormData() ;

        Data.append('name',formData.name);
        Data.append('address',formData.address); 
        Data.append('description',formData.description);
        if(formData.sale){
            Data.append('type','sale')
        } 
        else if(formData.rent){

           Data.append('type','rent');

        } 
        
        Data.append('parking',formData.parking); 
        Data.append('furnished',formData.furnished); 
        Data.append('offer',formData.offer); 
        Data.append('bed',formData.bed); 
        Data.append('bath',formData.bath); 
        Data.append('regularPrice',formData.regularPrice); 
        if(formData.discount) Data.append('discount',formData.discount); 
         Data.append("image",image[0]);
         
        
        
     
        try {

            setLoading(true)
             const response = await axios.post(import.meta.env.VITE_API_URL+`/listing/create-listing/${id}`,Data,{withCredentials:true}) ;


             const data = await response.data ;

             if(data.success){

                toast.success(data.message) ;
                setLoading(false)
                reset()
                return 
             }

            
            
        } catch (error) {

            toast.error(error?.response?.data?.message)
            console.log(error)
        }
        finally{

            setLoading(false)
        }
       





        

    }

    

    

   

   

    return (
     <main className="max-w-6xl mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-center my-7">Create Listing</h1>
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col md:flex-row gap-8"
  >
    {/* Left side */}
    <div className="flex-1 space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
        <input
          type="text"
          placeholder="Property name"
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
        <textarea
          placeholder="Detail Description"
          rows={4}
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
        <input
          type="text"
          placeholder="Full address"
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { id: "sale", label: "Sale" },
          { id: "parking", label: "Parking" },
          { id: "furnished", label: "Furnished" },
          { id: "rent", label: "Rent" },
          { id: "offer", label: "Offer" },
        ].map(({ id, label }) => (
          <div key={id} className="flex items-center">
            <input
              type="checkbox"
              id={id}
              className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded bg-gray-800"
              {...register(id)}
            />
            <label htmlFor={id} className="ml-2 block text-sm text-gray-300">
              {label}
            </label>
          </div>
        ))}
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Beds</label>
          <input
            type="number"
            defaultValue={1}
            min={1}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("bed", { required: "Bed is required" })}
          />
          {errors.beds && <p className="text-sm text-red-500 mt-1">{errors.beds.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Bath</label>
          <input
            defaultValue={1}
            type="number"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("bath", { required: "Bath Price is required" })}
          />
          {errors.bath && <p className="text-sm text-red-500 mt-1">{errors.bath.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Regular Price ($/Month)</label>
          <input
            type="number"
            min={1}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("regularPrice", { required: "Regular Price is required" })}
          />
          {errors.regularPrice && <p className="text-sm text-red-500 mt-1">{errors.regularPrice.message}</p>}
        </div>

        {offer && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Discount Price ($/Month)</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("discount")}
            />
          </div>
        )}
      </div>
    </div>

    {/* Right side */}
    <div className="flex-1 flex flex-col">
      <div>
        <label className="block text-sm font-medium text-gray-300">Featured Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md bg-gray-800">
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-400">
              <label className="relative cursor-pointer bg-gray-900 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  {...register("image", { required: "image is required" })}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-3">
        <button
          type="submit"
          className="w-full md:w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition cursor-pointer shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Create Listing"}
        </button>
      </div>
    </div>
  </form>
</main>

    );
};

export default Listing;