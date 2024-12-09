"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

interface Transaction {
  nominal: number;
  tanggal: string;
  kategori: string;
}

interface MyPayData {
  no_hp: string;
  saldo: number;
  riwayat_transaksi: Transaction[];
}

export const MyPaySection = () => {
  const [mypayData, setMyPayData] = useState<MyPayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = "0b57056c-fecb-4b6c-a915-4bf9bfa6420a";

  useEffect(() => {
    const fetchMyPayData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/mypay/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMyPayData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPayData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mypayData) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">MyPay Saldo</h1>
          <div className="mt-4 flex items-center gap-2 bg-white p-3 rounded-lg shadow">
            <Wallet className="w-5 h-5 text-blue-900" />
            <span className="font-medium">No HP: {mypayData.no_hp}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-white p-3 rounded-lg shadow">
            <Wallet className="w-5 h-5 text-blue-900" />
            <span className="font-medium">
              Saldo Anda: Rp {Number(mypayData.saldo).toLocaleString("id-ID")}
            </span>
          </div>
          <Button className="mt-4 bg-blue-900 hover:bg-blue-800 text-white">
            <Link href="/transaksiMyPay">Lakukan Transaksi</Link>
          </Button>
        </div>

        {/* Transaction History Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-900">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-semibold text-white">
                Riwayat Transaksi
              </h2>
            </div>
          </div>
          <div className="p-6">
            {mypayData.riwayat_transaksi.length === 0 ? (
              <div className="text-gray-500">Tidak ada riwayat transaksi.</div>
            ) : (
              mypayData.riwayat_transaksi.map((transaction, index) => (
                <Card
                  key={index}
                  className="border hover:border-blue-900 transition-all mb-4"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 border-blue-900 text-blue-900"
                      >
                        {transaction.kategori}
                      </Badge>
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          transaction.nominal > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.nominal > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        Rp{" "}
                        {Math.abs(Number(transaction.nominal)).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                    <Separator className="bg-blue-100" />
                    <div className="mt-4 text-gray-600">
                      Tanggal: {transaction.tanggal}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPaySection;
