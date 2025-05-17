import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useDispatch, useSelector ,} from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteListing, userListing } from '../Redux Toolkit/User/userSlice';
import {Link, useNavigate} from "react-router-dom"
import UpdateList from '../Components/UpdateList';

const UserListing = () => {
 
  const { User } = useSelector((state) => state.user);
  const listings = useSelector((state) => state?.user?.listing); 
  const [update,setUpdate] = useState(false) ;
  const [updateId , setUpdateId ] = useState('') ;
  const dispatch = useDispatch()
  const navigate = useNavigate() ;
  
  console.log('mene console ',listings)

  const id = User._id;

  
 
    


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/listing/${id}`,
          { withCredentials: true }
        );

        const data = await response.data;
        dispatch(userListing(data.listing))
        
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchListing();
  }, []);

  const handleDelete = async (listId) => {

       try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/user/delete-listing/${id}/${listId}`,
          { withCredentials: true }
        );

        const data = await response.data;
        toast.success(data.message) 
        dispatch(deleteListing(listId))
        
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }

    
  };

  const handleUpdate = (listId) => {
    
     setUpdateId(listId)
     setUpdate(!update) ;
  };

  return (
   <main className="p-6 h-screen bg-gray-900 text-gray-300">
  <div>
    <h1 className="text-2xl font-semibold mb-4 text-white">{User.username} : Your Listings</h1>
  </div>

  {listings?.length === 0 ? (
    <div className="text-center text-gray-400">No listings available</div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-700">
            <th className="py-3 px-4 border-b border-gray-600 text-sm font-bold text-gray-200">S.No</th>
            <th className="py-3 px-4 border-b border-gray-600 text-sm font-bold text-gray-200">Title</th>
            <th className="py-3 px-4 border-b border-gray-600 text-sm font-bold text-gray-200">Created At</th>
            <th className="py-3 px-4 border-b border-gray-600 text-sm font-bold text-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {listings?.map((l, index) => (
            <tr key={l._id} className="border-b border-gray-700 hover:bg-gray-700">
              <td className="py-3 px-4 text-sm text-gray-300">{index + 1}</td>
              <td className="py-3 px-4 text-sm text-blue-400 hover:underline cursor-pointer truncate">
                <Link to={`/list-details/${l._id}`}>{l.name}</Link>
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                {new Date(l.createdAt).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdate(l._id)}
                    className="mr-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 cursor-pointer rounded-md flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(l._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer flex items-center"
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {update && <UpdateList listId={updateId} />}
</main>

  );
};

export default UserListing;
