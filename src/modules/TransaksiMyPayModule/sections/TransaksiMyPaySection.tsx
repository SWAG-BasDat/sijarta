// TransaksiMyPayModule/TransaksiMyPay.tsx

"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/selectoption";
import { Badge } from "@/components/ui/badge";
import { Wallet, DollarSign, Banknote, Smartphone, Building } from "lucide-react";
import { MYPAY_CATEGORIES, SERVICES, BANKS } from "../constant";
import { MyPayCategory, UserType } from "../interface";


interface TransaksiMyPayProps {
  userType: UserType; // 'Pengguna' or 'Pekerja'
  userName: string;
  userBalance: number;
}

export const TransaksiMyPay: React.FC<TransaksiMyPayProps> = ({
  userType,
  userName,
  userBalance,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MyPayCategory | null>(null);
  const [amount, setAmount] = useState("");
  const [service, setService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const filteredCategories = MYPAY_CATEGORIES.filter((category) =>
    userType === "Pengguna" || category !== "Pembayaran Jasa"
  );

  const renderFormFields = () => {
    switch (selectedCategory) {
      case "TopUp MyPay":
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">Nominal:</label>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Masukkan nominal" />
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Top Up</Button>
          </div>
        );
      case "Pembayaran Jasa":
        if (userType === "Pengguna") {
          return (
            <div className="space-y-4">
              <label className="font-medium text-gray-700">Pesanan Jasa:</label>
              <Select value={service} onChange={(e) => setService(e.target.value)}>
                {SERVICES.map((service) => (
                  <SelectOption key={service} value={service}>
                    {service}
                  </SelectOption>
                ))}
              </Select>
              <label className="font-medium text-gray-700">Harga Jasa:</label>
              <Input value={amount} placeholder="Harga jasa" readOnly />
              <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Bayar</Button>
            </div>
          );
        }
        return null;
      case "Transfer MyPay":
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">NoHP Tujuan:</label>
            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Masukkan NoHP tujuan" />
            <label className="font-medium text-gray-700">Nominal:</label>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Masukkan nominal" />
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Bayar</Button>
          </div>
        );
      case "Withdrawal":
        return (
          <div className="space-y-4">
            <label className="font-medium text-gray-700">Nama Bank:</label>
            <Select value={bank} onChange={(e) => setBank(e.target.value)}>
              {BANKS.map((bank) => (
                <SelectOption key={bank} value={bank}>
                  {bank}
                </SelectOption>
              ))}
            </Select>
            <label className="font-medium text-gray-700">No Rekening:</label>
            <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Masukkan No Rekening" />
            <label className="font-medium text-gray-700">Nominal:</label>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Masukkan nominal" />
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Bayar</Button>
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
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-700">
                Nama User: <span className="text-blue-900">{userName}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Saldo User: <span className="text-blue-900">Rp {userBalance.toLocaleString("id-ID")}</span>
              </p>
            </div>
            <label className="font-medium text-gray-700">Kategori Transaksi:</label>
            <Select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value as MyPayCategory)}
              className="mb-4"
            >
              {filteredCategories.map((category) => (
                <SelectOption key={category} value={category}>
                  {category}
                </SelectOption>
              ))}
            </Select>
            <div className="mt-6">
              {renderFormFields()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransaksiMyPay;
