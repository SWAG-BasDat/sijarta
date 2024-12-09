'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SijartaUser } from '../../../types/next-auth';
import { Button } from '@/components/ui/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProfileSection: React.FC = () => {
  const { data: session } = useSession();
  const [workerData, setWorkerData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session || !session.user) return;

      const user = session.user as SijartaUser;
      
      if (user.isPekerja) {
        setIsLoading(true);
        try {
          const response = await fetch(`${API_URL}/workers/${user.id}`);
          const data = await response.json();
          
          if (response.ok) {
            setWorkerData(data);
          } else {
            setError(data.error || 'An error occurred');
          }
        } catch (err) {
          setError('Failed to fetch user data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const user = session.user as SijartaUser;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl w-full p-6 md:p-8 bg-white rounded-xl shadow-xl">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-600">Profile</h1>
          <a href="/profile/edit">
            <Button className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base text-black font-semi bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg shadow-md transition">
              Edit Profile
            </Button>
          </a>
        </div>

        <div className="space-y-8">
          {/* Profile Info Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6 p-6 bg-gray-50 rounded-xl shadow-md">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Personal Information</h2>
              <div className="space-y-4">
                {[
                  { label: 'Name', value: user.nama },
                  { label: 'Phone', value: user.noHP },
                  { label: 'Gender', value: user.jenisKelamin === 'L' ? 'Male' : 'Female' },
                  { label: 'Date of Birth', value: new Date(user.tanggalLahir).toLocaleDateString() },
                  { label: 'Address', value: user.alamat },
                  { label: 'Balance', value: user.saldoMyPay },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-gray-600">
                    <span>{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pekerja Info Card */}
            {user.isPekerja && (
              <div className="space-y-6 p-6 bg-gray-50 rounded-xl shadow-md">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Professional Information</h2>
                <div className="space-y-4">
                  {workerData?.link_foto && (
                    <div className="text-center">
                      <strong className="block text-lg text-gray-700 mb-2">Profile Picture</strong>
                      <img
                        src={workerData.link_foto ?? 'public/default_profile_picture.png'}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full mx-auto object-cover"
                      />
                    </div>
                  )}
                  {[
                    { label: 'Bank Name', value: workerData?.nama_bank ?? 'N/A' },
                    { label: 'Account Number', value: workerData?.nomor_rekening ?? 'N/A' },
                    { label: 'NPWP', value: workerData?.npwp ?? 'N/A' },
                    { label: 'Rating', value: workerData?.rating ?? 'N/A' },
                    { label: 'Completed Orders', value: workerData?.jml_pesanan_selesai ?? 'N/A' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-gray-600">
                      <span>{item.label}</span>
                      <span className="font-semibold text-gray-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category Table */}
          {user.kategori && user.kategori.length > 0 && (
            <div className="p-6 bg-gray-50 rounded-xl shadow-md">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Categories</h2>
              <table className="min-w-full table-auto mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600">#</th>
                    <th className="px-4 py-2 text-left text-gray-600">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {user.kategori.map((category, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;