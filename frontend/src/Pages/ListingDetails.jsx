import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { BiMoney, BiSolidOffer } from 'react-icons/bi'
import Contact from '../Components/Contact'

const ListingDetails = () => {
    const { listId } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [contact , setContact] = useState(false)

    const id = useSelector((state)=>state.user.User._id) ;

    useEffect(() => {
        const getListing = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user/single-list/${listId}`
                );
                const data = await response.data;

                if (data.success) {
                    setListing(data.singleList);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            } finally {
                setLoading(false)
            }
        };
        getListing();
    }, [listId]);

    const handleContact = ()=>{
        setContact(!contact)
    } 

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!listing) {
        return <div className="flex justify-center items-center h-screen">No listing found</div>
    }

    return (
      <main className="max-w-6xl mx-auto p-4 bg-gray-900 text-gray-300">
  {/* Property Header */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-white">{listing.name}</h1>
    <div className="flex items-center mt-2 text-gray-400">
      <MdLocationOn className="mr-1" />
      <span>{listing.address}</span>
    </div>
  </div>

  {/* Property Image */}
  <div className="mb-8 w-full rounded-lg shadow-lg overflow-hidden">
    <img
      src={listing.imageUrl}
      alt={listing.name}
      className="w-full h-auto md:max-h-[500px] object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Property Details */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Left Column - Main Details */}
    <div className="md:col-span-2">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-900 text-red-400 px-3 py-1 rounded text-sm font-semibold">
            {listing.type === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
          {listing.offer && (
            <span className="flex items-center bg-green-900 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
              <BiSolidOffer className="mr-1" />
              Special Offer
            </span>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">Description</h2>
          <p className="text-gray-400">{listing.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center">
            <FaBed className="mr-2 text-blue-400" />
            <span>{listing.bedRooms} Bedroom{listing.bedRooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-2 text-blue-400" />
            <span>{listing.bathRooms} Bathroom{listing.bathRooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            {listing.parking ? (
              <>
                <FaParking className="mr-2 text-green-400" />
                <span>Parking Available</span>
              </>
            ) : (
              <>
                <FaParking className="mr-2 text-red-400" />
                <span>No Parking</span>
              </>
            )}
          </div>
          <div className="flex items-center">
            {listing.furnished ? (
              <>
                <FaChair className="mr-2 text-green-400" />
                <span>Furnished</span>
              </>
            ) : (
              <>
                <FaChair className="mr-2 text-red-400" />
                <span>Not Furnished</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Right Column - Price and Contact */}
    <div className="md:col-span-1">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">Price Details</h2>
          <div className="flex items-center">
            <BiMoney className="mr-2 text-blue-400 text-2xl" />
            <div>
              {listing.offer ? (
                <>
                  <span className="text-red-500 line-through mr-2">${listing.regularPrice}{listing.type === 'rent' ? '/month' : ''}</span>
                  <span className="text-2xl font-bold text-green-400">${listing.discountPrice}{listing.type === 'rent' ? '/month' : ''}</span>
                  <span className="block text-sm text-gray-500">Discounted Price</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-white">${listing.regularPrice}{listing.type === 'rent' ? '/month' : ''}</span>
              )}
            </div>
          </div>
        </div>

        {
          id == listing.user._id ? (
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition cursor-pointer duration-200">
              You are Owner
            </button>
          ) : (
            <button
              className="w-full bg-blue-700 cursor-pointer hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              onClick={handleContact}
            >
              Contact Property Owner
            </button>
          )
        }
      </div>
    </div>
  </div>

  {/* Additional Info */}
  <div className="bg-gray-800 rounded-lg shadow-md p-6 mt-6">
    <h2 className="text-xl font-semibold text-white mb-4">Additional Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-gray-400">
          <span className="font-semibold">Listed on:</span> {new Date(listing.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-400">
          <span className="font-semibold">Last updated:</span> {new Date(listing.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        {listing.user && (
          <p>Listed by:
            <span className="text-green-400 font-bold"> {listing.user.username}</span>
          </p>
        )}
      </div>
    </div>
  </div>

  {contact && <Contact contact={contact} setContact={setContact} emailAddress={listing.user.email} />}
</main>

    )
}

export default ListingDetails