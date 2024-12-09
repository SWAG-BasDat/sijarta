"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, ShoppingCart, Tag, Percent, Wallet } from "lucide-react";
import { SuccessModal } from "../components/ModalSukses";
import { FailureModal } from "../components/ModalGagal";
import { formatCurrency, formatDate, calculateExpiryDate } from "../constant";
import { VoucherProps, PromoProps } from "../interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DiskonPageSection() {
  const { data: session, status } = useSession();
  const [vouchers, setVouchers] = useState<VoucherProps[]>([]);
  const [promos, setPromos] = useState<PromoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherProps | null>(
    null
  );
  const [purchaseResult, setPurchaseResult] = useState<any>(null);
  const [saldo, setSaldo] = useState(0);
  const [myPayId, setMyPayId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchMyPayDetails(session.user.id);
    }
    fetchVouchersAndPromos();
  }, [session, status]);

  const fetchMyPayDetails = async (userId: string) => {
    try {
      console.log("Fetching MyPay details for user:", userId);

      const myPayResponse = await fetch(`${API_URL}/mypay/${userId}`);
      if (!myPayResponse.ok) {
        throw new Error("Failed to fetch MyPay details");
      }
      const myPayData = await myPayResponse.json();
      console.log("MyPay data received:", myPayData);
      setSaldo(myPayData.saldo || 0);
    } catch (err) {
      console.error("Error fetching MyPay details:", err);
      setError("Failed to load MyPay information");
    }
  };

  const fetchVouchersAndPromos = async () => {
    try {
      setLoading(true);
      const [voucherRes, promoRes] = await Promise.all([
        fetch(`${API_URL}/vouchers`),
        fetch(`${API_URL}/promos`),
      ]);

      if (!voucherRes.ok || !promoRes.ok) {
        throw new Error(
          !voucherRes.ok ? "Failed to fetch vouchers" : "Failed to fetch promos"
        );
      }

      const voucherData = await voucherRes.json();
      const promoData = await promoRes.json();

      setVouchers(
        Array.isArray(voucherData)
          ? voucherData.map((v: any) => ({
              kode: v.kode || "",
              potongan: `${v.potongan || 0}%`,
              minTransaksi: Number(v.mintrpemesanan || 0),
              jumlahHariBerlaku: Number(v.jmlhariberlaku || 0),
              kuotaPenggunaan: Number(v.kuotapenggunaan || 0),
              harga: Number(v.harga || 0),
            }))
          : []
      );

      setPromos(
        Array.isArray(promoData)
          ? promoData.map((p: any) => ({
              kode: p[0] || "",
              tanggalAkhirBerlaku: p[1] || "",
              potongan: `${p[2] || 0}%`,
              minTransaksi: Number(p[3] || 0),
            }))
          : []
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (voucher: VoucherProps) => {
    console.log("Attempting purchase with:", {
      userId: session?.user?.id,
      voucher: voucher,
      currentSaldo: saldo,
    });

    if (!session?.user?.id) {
      console.log("Purchase blocked due to:", {
        hasUserId: !!session?.user?.id,
      });
      setFailureModalOpen(true);
      return;
    }

    try {
      const requestBody = {
        user_id: session.user.id,
        kode_voucher: voucher.kode,
      };
      console.log("Sending purchase request:", requestBody);

      const response = await fetch(`${API_URL}/vouchers/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Purchase response:", result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to purchase voucher");
      }

      setPurchaseResult(result.data);
      setSelectedVoucher(voucher);
      setSuccessModalOpen(true);

      if (result.data.saldo_tersisa !== undefined) {
        setSaldo(result.data.saldo_tersisa);
      }

      fetchVouchersAndPromos();
    } catch (error) {
      console.error("Purchase failed:", error);
      setFailureModalOpen(true);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-blue-900">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            Voucher & Promo Spesial
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Temukan voucher eksklusif dan promo menarik untuk menghemat
            pembelian Anda
          </p>
          <div className="mt-4 flex items-center gap-2 bg-white p-3 rounded-lg shadow">
            <Wallet className="w-5 h-5 text-blue-900" />
            <span className="font-medium">
              Saldo MyPay: {formatCurrency(saldo)}
            </span>
          </div>
        </div>

        <div className="grid gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-900">
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Voucher Tersedia
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vouchers.map((voucher) => (
                  <Card
                    key={voucher.kode}
                    className="border-2 hover:border-blue-900 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 border-blue-900 text-blue-900"
                        >
                          {voucher.kode}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-900"
                        >
                          <Percent className="w-4 h-4 mr-1" />
                          {voucher.potongan}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <ShoppingCart className="w-4 h-4" />
                          <span>
                            Min. Transaksi:{" "}
                            {formatCurrency(voucher.minTransaksi)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Berlaku {voucher.jumlahHariBerlaku} hari</span>
                        </div>

                        <Separator className="bg-blue-100" />

                        <div className="flex justify-between items-center">
                          <div className="text-lg font-semibold text-blue-900">
                            {formatCurrency(voucher.harga)}
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-900"
                          >
                            {voucher.kuotaPenggunaan} kali pakai
                          </Badge>
                        </div>

                        <Button
                          onClick={() => handleBuyClick(voucher)}
                          className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                          disabled={saldo < voucher.harga}
                        >
                          {saldo < voucher.harga
                            ? "Saldo MyPay Tidak Cukup"
                            : "Beli dengan MyPay"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-900">
              <div className="flex items-center gap-3">
                <Percent className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Promo Berlangsung
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promos.map((promo) => (
                  <Card
                    key={promo.kode}
                    className="border hover:border-blue-900 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 border-blue-900 text-blue-900"
                        >
                          {promo.kode}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-900"
                        >
                          <Percent className="w-4 h-4 mr-1" />
                          {promo.potongan}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <ShoppingCart className="w-4 h-4" />
                          <span>
                            Min. Transaksi: {formatCurrency(promo.minTransaksi)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            Berlaku sampai{" "}
                            {formatDate(promo.tanggalAkhirBerlaku)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedVoucher && purchaseResult && (
        <SuccessModal
          isOpen={successModalOpen}
          onClose={() => {
            setSuccessModalOpen(false);
            setPurchaseResult(null);
          }}
          voucherCode={selectedVoucher.kode}
          expiryDate={purchaseResult.tgl_akhir}
          quota={selectedVoucher.kuotaPenggunaan}
        />
      )}

      <FailureModal
        isOpen={failureModalOpen}
        onClose={() => setFailureModalOpen(false)}
      />
    </div>
  );
}
