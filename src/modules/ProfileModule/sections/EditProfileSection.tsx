'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SijartaUser } from '../../../types/next-auth';
import { useRouter } from 'next/navigation';

const EditProfileSection: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<SijartaUser | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    noHP: '',
    password: '',
    jenisKelamin: 'L',
    tanggalLahir: '',
    alamat: '',
    namaBank: 'gopay',
    noRekening: '',
    npwp: '',
    urlFoto: ''
  });
  const [workerData, setWorkerData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session || !session.user) return;

      const user = session.user as SijartaUser;
      const user_id = user.id as string;
      setUser(user);
      
      setIsLoading(true);
      setError(null);

      try {
        const endpoint = user.isPekerja ? `/workers/${user_id}` : `/customers/${user_id}`;
        const response = await fetch(`${API_URL}${endpoint}`);
        const data = await response.json();
        
        if (response.ok) {
          if (user.isPekerja) {
            setWorkerData(data);
            setFormData(prev => ({
              ...prev,
              "namaBank": data.namaBank || 'gopay',
              "noRekening": data.noRekening || '',
              "npwp": data.npwp || '',
              "urlFoto": data.urlFoto || ''
            }));
          }
        } else {
          setError(data.error || 'An error occurred');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const updatedData = {
      "nama": formData.nama || user?.nama,
      "no_hp": formData.noHP || user?.noHP,
      "pwd": formData.password,
      "jenis_kelamin": formData.jenisKelamin || user?.jenisKelamin,
      "tgl_lahir": formData.tanggalLahir || user?.tanggalLahir,
      "alamat": formData.alamat || user?.alamat,
      "is_pekerja": user?.isPekerja,
      "nama_bank": formData.namaBank || workerData?.namaBank,
      "nomor_rekening": formData.noRekening || workerData?.noRekening,
      "npwp": formData.npwp || workerData?.npwp,
      "link_foto": formData.urlFoto || workerData?.urlFoto,
    };

    try {
      const response = await fetch(`${API_URL}/users/${user?.id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Profile updated successfully');
        setTimeout(() => router.push('/'), 2000);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={onSubmit} className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-blue-600 text-center">
          Edit Profile
        </h1>

        {successMessage && (
          <div className="text-green-600 text-center">{successMessage}</div>
        )}
        {error && (
          <div className="text-red-600 text-center">{error}</div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="nama"
              value={formData.nama || user?.nama || ''}
              placeholder="Name"
              onChange={handleInputChange}
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="noHP"
              value={formData.noHP || user?.noHP || ''}
              placeholder="Phone Number"
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            onChange={handleInputChange}
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="jenisKelamin"
              value={formData.jenisKelamin || user?.jenisKelamin || 'L'}
              onChange={handleInputChange}
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="L">Male</option>
              <option value="P">Female</option>
            </select>
            <input
              type="date"
              name="tanggalLahir"
              value={formData.tanggalLahir || (user?.tanggalLahir ? new Date(user.tanggalLahir).toISOString().split('T')[0] : '')}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <textarea
            name="alamat"
            value={formData.alamat || user?.alamat || ''}
            placeholder="Address"
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {user?.isPekerja && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Pekerja Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="namaBank"
                value={formData.namaBank || workerData?.namaBank || 'gopay'}
                onChange={handleInputChange}
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="bca">BCA</option>
                <option value="bni">BNI</option>
                <option value="bri">BRI</option>
                <option value="mandiri">Mandiri</option>
                <option value="gopay">GoPay</option>
              </select>
              <input
                type="text"
                name="noRekening"
                value={formData.noRekening || workerData?.noRekening || ''}
                placeholder="No. Rekening"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="npwp"
                value={formData.npwp || workerData?.npwp || ''}
                placeholder="NPWP"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="urlFoto"
                value={formData.urlFoto || workerData?.urlFoto || ''}
                placeholder="URL Foto"
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white font-semibold rounded-md 
            ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfileSection;