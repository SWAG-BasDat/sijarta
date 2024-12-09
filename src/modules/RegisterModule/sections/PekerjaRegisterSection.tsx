'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PekerjaRegisterSection = () => {
  const [nama, setNama] = useState('');
  const [noHP, setNoHP] = useState('');
  const [password, setPassword] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [namaBank, setNamaBank] = useState('gopay');
  const [noRekening, setNoRekening] = useState('');
  const [npwp, setNpwp] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  // Phone number validation (should start with "08")
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^08\d+/;
    return phoneRegex.test(phone);
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(noHP)) {
      setError('Phone number must start with 08.');
      return;
    }

    // Prepare the payload
    const pekerjaData = {
      "nama": nama,
      "no_hp": noHP,
      "pwd": password,
      "jenis_kelamin": jenisKelamin,
      "tgl_lahir": tanggalLahir,
      "alamat": alamat,
      "is_pekerja": true,
      "nama_bank": namaBank,
      "nomor_rekening": noRekening,
      "npwp": npwp,
      "link_foto": urlFoto
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pekerjaData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Registration successful');
        setTimeout(() => {
          router.push('/'); // Redirect to home page after success
        }, 2000);
      } else {
        // Handle error
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
      <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Daftar sebagai Pekerja</h1>

        {/* Show error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Show success message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="space-y-4">
          <div className='flex gap-4'>
            <div className='space-y-4'>
              <input
                type="text"
                name="nama"
                placeholder="Name"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              
              <input
                type="text"
                name="noHP"
                placeholder="Phone Number"
                value={noHP}
                onChange={(e) => setNoHP(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              
              <select
                name="jenisKelamin"
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="L">Male</option>
                <option value="P">Female</option>
              </select>

              <input
                type="date"
                name="tanggalLahir"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className='space-y-4'>
              <select
                name="namaBank"
                value={namaBank}
                onChange={(e) => setNamaBank(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="gopay">GoPay</option>
                <option value="ovo">OVO</option>
                <option value="bca">Virtual Account BCA</option>
                <option value="bni">Virtual Account BNI</option>
                <option value="mandiri">Virtual Account Mandiri</option>
              </select>
              <input
                type="text"
                name="noRekening"
                placeholder='No. Rekening'
                value={noRekening}
                onChange={(e) => setNoRekening(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="npwp"
                placeholder='NPWP'
                value={npwp}
                onChange={(e) => setNpwp(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="urlFoto"
                placeholder='URL Foto'
                value={urlFoto}
                onChange={(e) => setUrlFoto(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <textarea
            name="alamat"
            placeholder="Address"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PekerjaRegisterSection;