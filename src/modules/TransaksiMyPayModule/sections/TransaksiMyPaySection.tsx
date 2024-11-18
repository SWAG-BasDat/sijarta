"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/selectoption";
import { Wallet } from "lucide-react";
import { KATEGORI_TR_MYPAY, KATEGORI_JASA, NAMA_BANK } from "../constant";
import { KategoriMyPay, TransaksiMyPayProps, Transaction } from "../interface";

export const TransaksiMyPay: React.FC<TransaksiMyPayProps> = ({ userType }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<KategoriMyPay | null>(null);
  const [amount, setAmount] = useState("");
  const [service, setService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [dummyTransactions, setDummyTransactions] = useState<Transaction[]>([]);

  const handlePayment = () => {
    if (!selectedCategory || !amount || isNaN(Number(amount))) {
      alert("Mohon isi semua field dengan benar!");
      return;
    }

    // Buat transaksi dummy
    const newTransaction: Transaction = {
      kategoriTransaksi: selectedCategory,
      nominal: Number(amount),
      tanggal: new Date().toLocaleDateString("id-ID"),
    };

    // Tambahkan ke daftar transaksi dummy
    setDummyTransactions((prev) => [newTransaction, ...prev]);
    alert("Transaksi berhasil dibuat!");

    // Reset form
    setSelectedCategory(null);
    setAmount("");
    setService("");
    setPhoneNumber("");
    setBank("");
    setAccountNumber("");
  };

  const renderFormFields = () => {
    switch (selectedCategory) {
      case "TopUp MyPay":
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">Nominal:</label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan nominal"
            />
            <Button
              onClick={handlePayment}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            >
              Top Up
            </Button>
          </div>
        );
      case "Pembayaran Jasa":
        if (userType === "Pengguna") {
          return (
            <div className="space-y-4">
              <label className="font-medium text-gray-700">Pesanan Jasa:</label>
              <Select
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {KATEGORI_JASA.map((service) => (
                  <SelectOption key={service} value={service}>
                    {service}
                  </SelectOption>
                ))}
              </Select>
              <label className="font-medium text-gray-700">Harga Jasa:</label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Masukkan harga jasa"
              />
              <Button
                onClick={handlePayment}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white"
              >
                Bayar
              </Button>
            </div>
          );
        }
        return null;
      case "Transfer MyPay":
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">NoHP Tujuan:</label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Masukkan NoHP tujuan"
            />
            <label className="font-medium text-gray-700">Nominal:</label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan nominal"
            />
            <Button
              onClick={handlePayment}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            >
              Bayar
            </Button>
          </div>
        );
      case "Withdrawal":
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">Nama Bank:</label>
            <Select value={bank} onChange={(e) => setBank(e.target.value)}>
              {NAMA_BANK.map((bank) => (
                <SelectOption key={bank} value={bank}>
                  {bank}
                </SelectOption>
              ))}
            </Select>
            <label className="font-medium text-gray-700">No Rekening:</label>
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Masukkan No Rekening"
            />
            <label className="font-medium text-gray-700">Nominal:</label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan nominal"
            />
            <Button
              onClick={handlePayment}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            >
              Bayar
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <Card className="rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-900 text-white">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">Form Transaksi MyPay</h2>
            </div>
          </div>
          <CardContent className="p-6">
            <label className="font-medium text-gray-700">
              Kategori Transaksi:
            </label>
            <Select
              value={selectedCategory || ""}
              onChange={(e) =>
                setSelectedCategory(e.target.value as KategoriMyPay)
              }
              className="mb-4"
            >
              {KATEGORI_TR_MYPAY.filter((category) => {
                if (category === "Pembayaran Jasa" && userType === "Pekerja") {
                  return false; // Hilangkan kategori "Pembayaran Jasa" untuk Pekerja
                }
                return true;
              }).map((category) => (
                <SelectOption key={category} value={category}>
                  {category}
                </SelectOption>
              ))}
            </Select>
            <div className="mt-6">{renderFormFields()}</div>
          </CardContent>
        </Card>

        {/* Riwayat Transaksi Dummy */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Riwayat Transaksi</h2>
          {dummyTransactions.map((transaction, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg shadow bg-white"
            >
              <p>Kategori: {transaction.kategoriTransaksi}</p>
              <p>Nominal: Rp {transaction.nominal.toLocaleString("id-ID")}</p>
              <p>Tanggal: {transaction.tanggal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransaksiMyPay;
