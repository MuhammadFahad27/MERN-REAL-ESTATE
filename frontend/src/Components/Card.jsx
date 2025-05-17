import {
  FaMapMarkerAlt,
  FaParking,
  FaCouch,
  FaBath,
  FaBed,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Card = ({ list }) => {

  const navigate = useNavigate() ;

  const handleDetails = (listId)=>{

    navigate(`/list-details/${listId}`)
  }
return (
  <div className="border border-gray-700 rounded-xl p-4 shadow-sm
  cursor-pointer hover:scale-105 bg-gray-900 hover:shadow-md transition duration-300 relative overflow-hidden">
    
    {/* Type badge */}
    <span
      className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
        list.type === 'rent' ? 'bg-blue-800 text-blue-200' : 'bg-green-800 text-green-200'
      }`}
    >
      {list.type === 'rent' ? 'For Rent' : 'For Sale'}
    </span>

    <img
      src={list.imageUrl}
      alt={list.name}
      className="w-full h-40 object-cover rounded-md mb-2"
    />

    <h2 className="text-base font-semibold mt-1 truncate text-white underline "
    onClick={()=>{
      handleDetails(list._id)
    }}>{list.name}</h2>

    <p className="text-gray-300 text-sm flex items-center gap-1 truncate">
      <FaMapMarkerAlt className="text-red-400" />
      {list.address}
    </p>

    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{list.description}</p>

    <div className="flex justify-between text-xs text-gray-300 mt-2">
      <p className="flex items-center gap-1">
        <FaBed /> {list.bedRooms} {list.bedRooms === 1 ? 'Bed' : 'Beds'}
      </p>
      <p className="flex items-center gap-1">
        <FaBath /> {list.bathRooms} {list.bathRooms === 1 ? 'Bath' : 'Baths'}
      </p>
    </div>

    <div className="mt-2 text-indigo-400 font-semibold flex items-center gap-2 text-sm">
      {list.offer ? (
        <>
          <span className="line-through text-gray-500">
            {list.regularPrice}$
          </span>
          <span>
            {list.discountPrice}${' '}
            {list.type === 'rent' && (
              <span className="text-xs">/month</span>
            )}
          </span>
        </>
      ) : (
        <span>
          {list.regularPrice}$
          {list.type === 'rent' && (
            <span className="text-xs"> /month</span>
          )}
        </span>
      )}
    </div>

    <div className="flex flex-wrap gap-3 mt-2 text-xs text-green-400">
      {list.furnished && (
        <span className="flex items-center gap-1">
          <FaCouch /> Furnished
        </span>
      )}
      {list.parking && (
        <span className="flex items-center gap-1">
          <FaParking /> Parking
        </span>
      )}
    </div>
  </div>
);

};

export default Card;
