'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SijartaUser } from '../../../types/next-auth';

const EditProfileSection: React.FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<SijartaUser | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as SijartaUser);
    }
  }, [session]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-blue-600 text-center">
          Edit Profile
        </h1>
        
        {/* Shared Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="nama"
              defaultValue={user.nama}
              placeholder="Name"
              required
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="noHP"
              defaultValue={user.noHP}
              placeholder="Phone Number"
              required
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="jenisKelamin"
              defaultValue={user.jenisKelamin}
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="L">Male</option>
              <option value="P">Female</option>
            </select>
            <input
              type="date"
              name="tanggalLahir"
              defaultValue={new Date(user.tanggalLahir).toISOString().split('T')[0]}
              required
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <textarea
            name="alamat"
            defaultValue={user.alamat}
            placeholder="Address"
            required
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Pekerja-Specific Fields */}
        {user.isPekerja && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Pekerja Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="namaBank"
                defaultValue={user.namaBank ?? ''}
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="bca">BCA</option>
                <option value="bni">BNI</option>
                <option value="bri">BRI</option>
                <option value="mandiri">Mandiri</option>
              </select>
              <input
                type="text"
                name="noRekening"
                defaultValue={user.noRekening ?? ''}
                placeholder="No. Rekening"
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="npwp"
                defaultValue={user.npwp ?? ''}
                placeholder="NPWP"
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="urlFoto"
                defaultValue={user.urlFoto ?? ''}
                placeholder="URL Foto"
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileSection;
