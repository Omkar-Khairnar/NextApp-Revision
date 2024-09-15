"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import Loader from '../loader/page';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const initialData = {
    email: "",
    password: ""
  };
  const [user, setUser] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      const data = response.data;
      if (!data.error) {
        toast.success(data.msg);
        router.push('/profile');
      } else {
        setUser(initialData);
        toast.error(data.msg);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center text-black">Login</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={onLogin}
                >
                  Login
                </button>
              </form>

              <div className="flex justify-between text-sm mt-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-500 hover:underline">
                    Sign Up
                  </Link>
                </p>
                <Link href="/forgotpassword" className="text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default LoginPage;
