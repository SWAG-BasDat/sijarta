import Link from 'next/link';
import { User, Briefcase } from 'lucide-react';

export const RegisterSection = () => {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center text-gray-800 space-y-6">
          <h1 className="text-4xl text-blue-600 font-bold">Register</h1>
          <p className="text-lg text-black">Are you registering as a:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/register/pengguna"
              className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xl p-12 transition-transform transform hover:scale-105"
            >
              <User className="w-12 h-12 text-white" />
              <span className="text-2xl text-white font-semibold mt-4">Pengguna</span>
            </Link>

            <Link
              href="/register/pekerja"
              className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xl p-12 transition-transform transform hover:scale-105"
            >
              <Briefcase className="w-12 h-12 text-white" />
              <span className="text-2xl text-white font-semibold mt-4">Pekerja</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
