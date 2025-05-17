import React, { useState ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { useDispatch } from 'react-redux';
import { userListing } from '../Redux Toolkit/User/userSlice';


const UpdateList = ({listId}) => {
    const [showModal, setShowModal] = useState(true);
    const [isUpdated,setIsUpdated] = useState(false) ;
    const dispatch = useDispatch()

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
  }, [isUpdated]);

    
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    const offer = watch('offer');
    const image = watch('image');
    const [loading, setLoading] = useState(false);
    const id = useSelector((state) => state.user.User._id);

    const onSubmit = async (formData) => {
        if (formData.sale && formData.rent) {
            toast.error('Sale & rent can not choose at a time');
            return;
        }

        if (Number(formData.discount) && (Number(formData.discount) >= Number(formData.regularPrice))) {
            toast.error('Discount should be less than sale price');
            return;
        }

        if (offer && !formData.discount) {
            toast.error('If you choose offer then give discount, otherwise remove it');
            return;
        }

        const Data = new FormData();
        Data.append('name', formData.name);
        Data.append('address', formData.address);
        Data.append('description', formData.description);
        if (formData.sale) {
            Data.append('type', 'sale');
        } else if (formData.rent) {
            Data.append('type', 'rent');
        }
        Data.append('parking', formData.parking);
        Data.append('furnished', formData.furnished);
        Data.append('offer', formData.offer);
        Data.append('bed', formData.bed);
        Data.append('bath', formData.bath);
        Data.append('regularPrice', formData.regularPrice);
        if (formData.discount) Data.append('discount', formData.discount);
        Data.append('image', image[0]);

        try {
            setLoading(true);
            const response = await axios.put(import.meta.env.VITE_API_URL + `/user/update-listing/${id}/${listId}`, Data, { withCredentials: true });
            const data = await response.data;
            if (data.success) {
                toast.success(data.message);
                setIsUpdated(true)
                setLoading(false);
                setShowModal(false)
                dispatch()
                reset();
                return;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-900 rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] 
            overflow-y-auto p-4 relative">
                {/* Close button */}
                <button
                    className="absolute top-2 right-4 text-3xl font-bold text-gray-100 hover:text-red-500"
                    onClick={() => setShowModal(false)}
                >
                    &times;
                </button>

                <h1 className="text-3xl font-bold text-center my-7">Update List</h1>
                <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col md:flex-row gap-8"
            >
                {/* Left side */}
                <div className="flex-1 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-100 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Property name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('name', )}
                        />
                       
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-100 mb-1">Description</label>
                        <textarea
                            placeholder="Detail Description"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('description', )}
                        ></textarea>
                       
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-100 mb-1">Address</label>
                        <input
                            type="text"
                            placeholder="Full address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('address',)}
                        />
                        
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                
                                id="sale"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                {...register('sale')}
                                
                            />
                            <label htmlFor="sale" className="ml-2 block text-sm text-gray-100">Sale</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="parking"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                {...register('parking')}
                            />
                            <label htmlFor="parking" className="ml-2 block text-sm text-gray-100">Parking</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                {...register('furnished')}
                            />
                            <label htmlFor="furnished" className="ml-2 block text-sm text-gray-100">Furnished</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rent"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                {...register('rent')}
                            />
                            <label htmlFor="rent" className="ml-2 block text-sm text-gray-100">Rent</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="offer"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                {...register('offer')}
                            />
                            <label htmlFor="offer" className="ml-2 block text-sm text-gray-100">Offer</label>
                        </div>
                    </div>

                    {/* Numbers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-100 mb-1">Beds</label>
                            <input
                                type="number"
                                defaultValue={1}
                                min={1}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('bed',)}
                            />
                            {errors.beds && <p className="text-sm text-red-500 mt-1">{errors.beds.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-100 mb-1">Bath</label>
                            <input
                            defaultValue={1}
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('bath', { required: 'Bath Price is required' })}
                            />
                                 {errors.bath && <p className="text-sm text-red-500 mt-1">{errors.bath.message}</p>}

                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-100 mb-1">Regular Price ($/Month)</label>
                            <input
                                type="number"
                                min={1}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('regularPrice', )}
                            />
                            {errors.regularPrice && <p className="text-sm text-red-500 mt-1">{errors.regularPrice.message}</p>}
                        </div>

                        {

                            offer &&  <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($/Month)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('discount')}
                            />
                        </div>
                        }
                       
                    </div>
                </div>

                {/* Right side */}
                <div className="flex-1 flex flex-col">

                   

                        <div>
                            <label className="block text-sm font-medium text-gray-100">
                                Featured Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input type="file" className="sr-only" 
                                              {...register("image", )}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                            

                                </div>
                            </div>
                        </div>
                  

                    {/* Submit button - now properly positioned at the bottom of right column */}
                    <div className="mt-3">
                        <button
                            type="submit"
                            className="w-full md:w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition cursor-pointer
                             shadow-md hover:shadow-lg"
                        disabled={loading}>
                            {loading ? <Spinner/> :"Update List "}
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default UpdateList;
