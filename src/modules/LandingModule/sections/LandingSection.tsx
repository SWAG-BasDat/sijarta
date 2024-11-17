import { Button } from '@/components/ui/button';
import React from 'react';
import { useSession } from 'next-auth/react';

const LandingSection = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 opacity-30"></div>
      <div className="absolute inset-0 bg-blue-800 opacity-20 z-0"></div>
      <svg
        className="absolute top-40 left-0 w-full h-full z-10 pointer-events-none"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="rgba(255, 255, 255, 0.1)"
          d="M0,128L48,160C96,192,192,256,288,261.3C384,267,480,213,576,192C672,171,768,181,864,202.7C960,224,1056,256,1152,240C1248,224,1344,160,1392,128H1440V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="text-center text-white space-y-8 z-20 relative px-4 sm:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          Welcome to <span className="text-yellow-400">Sijarta</span> by SWAG
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-blue-200">
          A platform to manage your tasks and jobs efficiently.
        </p>

        {!session?.user ? (
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/login">
              <Button className="w-full sm:w-auto px-6 py-3 text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg shadow-md transition">
                Log in
              </Button>
            </a>
            <a href="/register">
              <Button className="w-full sm:w-auto px-6 py-3 text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg shadow-md transition">
                Register
              </Button>
            </a>
          </div>
        ) : (
          <p className="text-base sm:text-lg lg:text-xl text-blue-200">
            You are logged in as {session.user.nama}
          </p>
        )}
      </div>
    </div>
  );
}

export default LandingSection