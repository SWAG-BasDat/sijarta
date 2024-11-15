"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VOUCHERS, PROMOS } from "../constant";

export const DiskonPageSection = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">DISKON</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Potongan</TableHead>
                <TableHead>Min Transaksi Pemesanan</TableHead>
                <TableHead>Jumlah Hari Berlaku</TableHead>
                <TableHead>Kuota Penggunaan</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VOUCHERS.map((voucher) => (
                <TableRow key={voucher.kode}>
                  <TableCell>{voucher.kode}</TableCell>
                  <TableCell>{voucher.potongan}</TableCell>
                  <TableCell>{formatCurrency(voucher.minTransaksi)}</TableCell>
                  <TableCell>{voucher.jumlahHariBerlaku} hari</TableCell>
                  <TableCell>{voucher.kuotaPenggunaan}</TableCell>
                  <TableCell>{formatCurrency(voucher.harga)}</TableCell>
                  <TableCell>
                    <Button>Beli</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promo</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Tanggal Akhir Berlaku</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROMOS.map((promo) => (
                <TableRow key={promo.kode}>
                  <TableCell>{promo.kode}</TableCell>
                  <TableCell>{formatDate(promo.tanggalAkhirBerlaku)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
