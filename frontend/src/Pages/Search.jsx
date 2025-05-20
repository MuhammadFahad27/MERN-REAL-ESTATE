import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {useNavigate , useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from "axios"
import Card from '../Components/Card';

const Search = () => {


  const [loading,setLoading] = useState(false)
  const [showLoading ,setshowLoading] = useState(false) ;
  const [Data,setData] = useState([]) ;
  const [showMore,setshowMore] = useState(false)
  const [visible,setVisible] = useState(4)



  useEffect(() => {
    
      console.log('Response Data : ',Data)
  }, [Data])
  
  
  // const location = useLocation()
  const { register, handleSubmit, watch ,setValue } = useForm({
    defaultValues: {
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'createdAt',
      order: '-1'
    }
  });
  const navigate = useNavigate() ;
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    if(data.sort === 'regularPrice_desc'){

      data.sort = 'regularPrice' ;
      data.order = 'desc'
    }
     if(data.sort === 'regularPrice_asc'){

      data.sort = 'regularPrice' ;
      data.order = 'asc'
    }
     if(data.sort === 'desc'){

      data.sort = 'createdAt'
      
      data.order = 'desc'
    }
     if(data.sort === 'asc'){

      data.sort = 'createdAt'
      
      data.order = 'asc'
    }
    const url = new URLSearchParams() ;
    url.set('searchTerm',data.searchTerm)
    url.set('type',data.type)
    url.set('parking',data.parking)
    url.set('furnished',data.furnished)
    url.set('offer',data.offer)
    url.set('sort',data.sort)
    url.set('order',data.order)
    const query = url.toString() ;
    navigate(`/search?${query}`)
    

  };
   useEffect(() => {

    const url = new URLSearchParams(location.search) ;
    const searchTermFromUrl = url.get('searchTerm')  ;
    const type = url.get('type')  ;
    const parking = url.get('parking')  ;
    const  furnished = url.get('furnished')  ;
    const offer = url.get('offer')  ;
    const sort = url.get('sort')  ;
    const  order  = url.get('order')  ;

    if(searchTermFromUrl || type || parking || furnished || offer || sort || order ){

        if (searchTermFromUrl) setValue('searchTerm', searchTermFromUrl);
        if (type) setValue('type', type);
        if (parking) setValue('parking', parking==='true' ? true : false);
        if (furnished ) setValue('furnished', furnished==='true'? true : false);
        if (offer ) setValue('offer', offer==='true'?true:false);
        if (sort) setValue('sort', sort);
        if (order) setValue('order', order);


    }

    const fetchListings = async ()=>{

      try {

          setLoading(true) ;
          const url = new URLSearchParams(location.search) ;
          const query = url.toString()
          const response = await axios.get(import.meta.env.VITE_API_URL+`/listing/get/?${query}`) ;
          const data = await response.data ;
          setData(data.listing) ;

          
          
        
      } catch (error) {
        
        setLoading(false)
        toast.error(error?.response?.data?.message)
      }
      finally{

        setLoading(false)
      }

    }
    fetchListings()
  }, [location.search])

 
  return (
   <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
  <div className="flex flex-col xl:flex-row gap-6 bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-700">

    {/* Search Form */}
    <div className="w-full xl:w-1/3 p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-200 font-semibold mb-1">Search</label>
          <input
            type="search"
            placeholder="Search..."
            className="w-full border border-gray-700 bg-gray-900 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm shadow-sm placeholder-gray-500"
            {...register("searchTerm")}
          />
        </div>

        <div>
          <label className="block text-gray-200 font-semibold mb-1">Type:</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="radio" value="all" {...register("type")} className="accent-cyan-400" /> Sale & Rent
            </label>
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="radio" value="sale" {...register("type")} className="accent-cyan-400" /> Sale
            </label>
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="radio" value="rent" {...register("type")} className="accent-cyan-400" /> Rent
            </label>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="checkbox" {...register("furnished")} className="accent-green-500" /> Furnished
            </label>
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="checkbox" {...register("parking")} className="accent-green-500" /> Parking
            </label>
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="checkbox" {...register("offer")} className="accent-green-500" /> Offer
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-200 font-semibold mb-1">Sort</label>
          <select
            className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            {...register("sort")} defaultValue={""}
          >
            <option  disabled className='text-white' >-- Sorting --</option>
            <option value="regularPrice_desc">Price: High to Low</option>
            <option value="regularPrice_asc">Price: Low to High</option>
            <option value="desc">Latest Listing</option>
            <option value="asc">Older Listing</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 w-full rounded-md hover:bg-cyan-700 transition duration-200 font-semibold shadow-md"
        >
          Search
        </button>
      </form>
    </div>

    <div className="hidden lg:block w-px bg-gray-700"></div>

    {/* Listing Results */}
    <div className="w-full xl:w-2/3 p-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-2xl font-bold text-white mb-6">Listing Results</h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent"></div>
            <p className="text-cyan-400 text-lg font-semibold">Loading...</p>
          </div>
        </div>
      ) : Data.length === 0 ? (
        <p className="text-gray-400">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-2">
          {Data.slice(0, visible).map((item, index) => (
            <Card key={index} list={item} />
          ))}
        </div>
      )}

      {visible < Data.length && (
        <button
          onClick={() => {
            setVisible(visible + 4);
            setshowLoading(true);
          }}
          className="mt-6 bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition duration-200 shadow-md"
        >
          Show more
        </button>
      )}
    </div>
  </div>
</main>


  );
};

export default Search;
