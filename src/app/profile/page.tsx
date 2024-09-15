"use client"
import axios from 'axios';
import  {useRouter}  from 'next/navigation';
import React, { useEffect } from 'react';

const ProfilePage = () => {
    const router = useRouter();
    const redirectToLoggedInUser =async() =>{
        const response = await axios.get('/api/users/me');
        // console.log(response);
        const data = response.data;
        const userId = data.data._id;
        if(!response.data.error){
            router.push(`../profile/${userId}`)
        }
    }

    useEffect(()=>{
        redirectToLoggedInUser();
    },[])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black">Profile</h2>
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
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
