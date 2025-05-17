import React, { useEffect, useState } from 'react';
import Intro from '../Components/Intro';
import axios from 'axios';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaTags, FaHome, FaMoneyBillWave } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const [offer, setOffer] = useState([]);
  const [rent, setRent] = useState([]);
  const [sale, setSale] = useState([]);
  const [loadingOffer, setLoadingOffer] = useState(true);
  const [loadingRent, setLoadingRent] = useState(true);
  const [loadingSale, setLoadingSale] = useState(true);
  const navigate = useNavigate() ;
  const [limit] = useState(6);

  

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setLoadingOffer(true);
        const res = await axios.get(import.meta.env.VITE_API_URL + `/listing/get/?offer=true`);
        setOffer(res.data?.listing || []);
      } catch (err) {
        console.log(err);
        setOffer([]);
      } finally {
        setLoadingOffer(false);
        fetchRentListings();
      }
    };

    const fetchRentListings = async () => {
      try {
        setLoadingRent(true);
        const res = await axios.get(import.meta.env.VITE_API_URL + `/listing/get/?type=rent`);
        setRent(res.data?.listing || []);
      } catch (err) {
        console.log(err);
        setRent([]);
      } finally {
        setLoadingRent(false);
        fetchSaleListings();
      }
    };

    const fetchSaleListings = async () => {
      try {
        setLoadingSale(true);
        const res = await axios.get(import.meta.env.VITE_API_URL + `/listing/get/?type=sale`);
        setSale(res.data?.listing || []);
      } catch (err) {
        console.log(err);
        setSale([]);
      } finally {
        setLoadingSale(false);
      }
    };

    fetchOfferListings();
  }, []);

  const handleDetails = (listId)=>{

    navigate(`/list-details/${listId}`)
  }
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
      <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
    </div>
  );

  const NoDataMessage = ({ section }) => (
    <div className="bg-gray-100 rounded-lg p-8 text-center">
      <h3 className="text-lg font-medium text-gray-700">No {section} listings available</h3>
      <p className="text-gray-500 mt-2">Check back later for new {section.toLowerCase()} properties</p>
    </div>
  );

  return (
  <>
    <Intro />

    {/* Sale Section */}
    <div className={`px-4 mt-10 bg-slate-950`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-100">
        <FaHome className="text-orange-400" /> Recent Places for Sale
      </h2>
      {loadingSale ? (
        <LoadingSpinner />
      ) : sale.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sale.slice(0, limit).map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 shadow rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3
                  className="text-lg font-semibold underline cursor-pointer text-gray-200 hover:text-orange-300"
                  onClick={() => {
                    handleDetails(item._id);
                  }}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-500" /> {item.address}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaBed /> {item.bedRooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {item.bathRooms}
                    </span>
                  </div>
                  <p className="text-orange-400 font-bold flex items-center gap-1">
                    ${item.regularPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataMessage section="sale" />
      )}
    </div>

    {/* Rent Section */}
    <div className="px-4 mt-10">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-100">
        <FaHome className="text-blue-400" /> Recent Places for Rent
      </h2>
      {loadingRent ? (
        <LoadingSpinner />
      ) : rent.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rent.slice(0, limit).map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 cursor-pointer hover:scale-105 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3
                  className="text-lg font-semibold underline cursor-pointer text-gray-200 hover:text-blue-300"
                  onClick={() => {
                    handleDetails(item._id);
                  }}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-500" /> {item.address}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaBed /> {item.bedRooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {item.bathRooms}
                    </span>
                  </div>
                  <p className="text-blue-400 font-bold flex items-center gap-1">
                    ${item.regularPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataMessage section="rent" />
      )}
    </div>

    {/* Offer Section */}
    <div className="px-4 mt-10 mb-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-100">
        <FaTags className="text-green-400" /> Recent Offers
      </h2>
      {loadingOffer ? (
        <LoadingSpinner />
      ) : offer.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {offer.slice(0, limit).map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 cursor-pointer hover:scale-105 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3
                  className="text-lg font-semibold underline cursor-pointer text-gray-200 hover:text-green-300"
                  onClick={() => {
                    handleDetails(item._id);
                  }}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-500" /> {item.address}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaBed /> {item.bedRooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {item.bathRooms}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-col items-end">
                    <span className="text-red-600 line-through mr-2 flex items-center gap-1">
                      ${item.regularPrice}
                    </span>
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      ${item.discountPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataMessage section="offer" />
      )}
    </div>
  </>
);

};

export default Home;