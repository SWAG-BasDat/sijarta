'use client';

import React from 'react';

const PekerjaRegisterSection = () => {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-12 px-6">
        <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Daftar sebagai Pekerja</h1>

        <div className="space-y-4">
            <div className='flex gap-4'>
                <div className='space-y-4'>
                    <input
                    type="text"
                    name="nama"
                    placeholder="Name"
                    required
                    className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    
                    <input
                    type="text"
                    name="noHP"
                    placeholder="Phone Number"
                    required
                    className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    
                    <select
                    name="jenisKelamin"
                    className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                    <option value="L">Male</option>
                    <option value="P">Female</option>
                    </select>

                    <input
                    type="date"
                    name="tanggalLahir"
                    required
                    className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>

                    <div className='space-y-4'>
                    <select
                    name="namaBank"
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
                    placeholder='No. Rekening'
                    required
                    className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                    type="text"
                    name="npwp"
                    placeholder='NPWP'
                    required
                    className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                    type="text"
                    name="urlFoto"
                    placeholder='URL Foto'
                    required
                    className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>
            <textarea
            name="alamat"
            placeholder="Address"
            required
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
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
}

export default PekerjaRegisterSection;
