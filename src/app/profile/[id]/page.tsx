"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast'



const ProfilePage = ({params}) => {
  const router = useRouter();


  const OnLogout = async()=>{
    try {
      const res = await axios.get('/api/users/logout');
      toast.success(res.data.msg);
      router.push('/login')
    } catch (error:any) {
      console.log(error);
      toast.error(error.message)
    }
  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black">Profile - {params.id}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-center text-black">
            <img
              className="w-24 h-24 rounded-full "
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-700">Username</h3>
            <p className="text-gray-600">john_doe</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-700">Email</h3>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>

          <button
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Edit Profile
          </button>
          <button
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={OnLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
