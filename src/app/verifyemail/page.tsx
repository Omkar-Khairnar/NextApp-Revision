"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const VerifyEmailPage = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setError(null);
    } catch (error: any) {
      setVerified(false);
      setError('Verification failed. Please try again.');
      console.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get('token');
    setToken(urlToken || '');
  }, [searchParams]);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Email Verification</h2>

        {!verified && !error && token.length > 0 && (
          <p className="text-blue-600 text-center">Verifying your email...</p>
        )}

        {verified && (
          <div className="text-center">
            <p className="text-green-600 mb-4">Email successfully verified!</p>
            <p className="text-gray-700">
              Your token: <span className="font-bold">{token}</span>
            </p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
          </div>
        )}

        <div className="text-center mt-6">
          <a href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
