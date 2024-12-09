'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Use this for programmatic navigation
import React, { useState } from 'react';

const LoginSection = () => {
  const [noHP, setNoHP] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Initialize useRouter hook for navigation

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Call signIn with redirect: false to handle errors
    const result = await signIn('credentials', {
      redirect: false,
      no_hp: noHP,  // Ensure the field name matches the backend
      pwd: password, // Ensure the field name matches the backend
    });
  
    console.log(result);  // Log the full response to debug
  
    if (result?.error) {
      console.error(result.error);  // Log the error message
      setError(result.error); 
    } else {
      setError(null); 
      router.push('/'); // Navigate to the homepage after successful login
    }    
  };
  

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
      <form
        onSubmit={onSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="noHP"
            placeholder="Phone Number"
            value={noHP}
            onChange={(e) => setNoHP(e.target.value)}
            required
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSection;
