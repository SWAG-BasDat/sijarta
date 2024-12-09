"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/selectoption";
import { Wallet } from "lucide-react";
import { TransaksiMyPayProps, KategoriMyPay } from "../interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TransaksiMyPay: React.FC<TransaksiMyPayProps> = ({ userType }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<KategoriMyPay | null>(null);
  const [amount, setAmount] = useState("");
  const [service, setService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [categories, setCategories] = useState<KategoriMyPay[]>([]);
  const [userData, setUserData] = useState({
    nama_user: "",
    saldo: 0,
    tanggal_transaksi: "",
  });


  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const userId = "0b57056c-fecb-4b6c-a915-4bf9bfa6420a";
        const response = await fetch(`${API_URL}/api/mypay/form/${userId}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data form MyPay");
        }
        const data = await response.json();
        setCategories(
          data.kategori_transaksi.map(
            (kategori: { nama_kategori: string }) => kategori.nama_kategori
          )
        );
        setUserData({
          nama_user: data.nama_user,
          saldo: Number(data.saldo),
          tanggal_transaksi: data.tanggal_transaksi,
        });
      } catch (error) {
        console.error("Error fetching form data:", error);
        alert("Gagal mengambil data form MyPay.");
      }
    };

    fetchFormData();
  }, []);

  const handlePayment = async () => {
    if (!selectedCategory || !amount || isNaN(Number(amount))) {
      alert("Mohon isi semua field dengan benar!");
      return;
    }

    const userId = "0b57056c-fecb-4b6c-a915-4bf9bfa6420a";
    const payload = {
      nama_kategori: selectedCategory,
      data: {
        nominal: Number(amount),
        id_pemesanan: selectedCategory === "Pembayaran Jasa" ? service : null,
        target_user_id:
          selectedCategory === "Transfer MyPay"
            ? phoneNumber
            : null,
        bank_name: selectedCategory === "Withdrawal" ? bank : null,
        account_number:
          selectedCategory === "Withdrawal" ? accountNumber : null,
      },
    };

    try {
      const response = await fetch(
        `${API_URL}/api/mypay/create-transaction/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Gagal membuat transaksi");
      }
      const data = await response.json();
      alert(data.message || "Transaksi berhasil dibuat!");

      // Reset form fields
      setAmount("");
      setService("");
      setPhoneNumber("");
      setBank("");
      setAccountNumber("");
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Gagal membuat transaksi.");
    }
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
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">Pesanan Jasa:</label>
            <Select
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <SelectOption value="Jasa A">Jasa A</SelectOption>
              <SelectOption value="Jasa B">Jasa B</SelectOption>
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
              Transfer
            </Button>
          </div>
        );
      case "Withdrawal":
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">Nama Bank:</label>
            <Select value={bank} onChange={(e) => setBank(e.target.value)}>
              <SelectOption value="Bank A">Bank A</SelectOption>
              <SelectOption value="Bank B">Bank B</SelectOption>
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
              Withdraw
            </Button>
          </div>
        );
      default:
        return (
          <p className="text-gray-500">
            Pilih kategori transaksi untuk menampilkan form.
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <Card className="rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-6 bg-blue-900 text-white">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">Form Transaksi MyPay</h2>
            </div>
          </div>
          <CardContent className="p-6">
            {/* Informasi User */}
            <div className="mb-6 space-y-2">
              <p>
                <strong>Nama User:</strong> {userData.nama_user}
              </p>
              <p>
                <strong>Tanggal Transaksi:</strong> {userData.tanggal_transaksi}
              </p>
              <p>
                <strong>Saldo:</strong> Rp{" "}
                {userData.saldo.toLocaleString("id-ID")}
              </p>
            </div>
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
              {categories.map((category) => (
                <SelectOption key={category} value={category}>
                  {category}
                </SelectOption>
              ))}
            </Select>
            <div className="mt-6">{renderFormFields()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransaksiMyPay;
