"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const page = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('/api/users/forgotpassword', { email });

      if (response.data.error) {
        toast.error(response.data.msg);
      } else {
        toast.success('Reset password email sent! Check your inbox.');
        setSubmitted(true);
      }
    } catch (error: any) {
      toast.error('Error sending reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black">Forgot Password</h2>

        {!submitted ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Registered Email ID</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </form>
        ) : (
          <div className="text-center text-green-500">
            Check your email to reset your password.
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
