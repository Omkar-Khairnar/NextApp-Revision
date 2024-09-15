"use client";

import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import Loader from '../loader/page'
import {toast} from 'react-hot-toast';

const SignupPage = () => {
  const router = useRouter();
  const initialData = {
    email: "",
    password: "",
    username: ""
  }
  const [user, setUser] = useState(initialData)

  const [loading, setLoading] = useState(false);

  const onSignUp = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user);
      const data = response.data;
      if(!data.error){
        toast.success(data.msg)
          router.push('/login')
      }
      else{
        setUser(initialData)
        toast.error(data.msg)
      }
      
    } catch (error:any) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    value={user.username}
                    className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    value={user.email}
                    className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    value={user.password}
                    className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={onSignUp}
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
              </p>
            </div>
          </div>
        )
      }
    </>
  );
};

export default SignupPage;
