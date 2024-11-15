import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SuccessModalProps } from "../interface";

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  voucherCode,
  expiryDate,
  quota,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            SUKSES
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4 py-4">
          <p className="text-lg">
            Selamat! Anda berhasil membeli voucher kode {voucherCode}.
          </p>
          <p className="text-lg">
            Voucher ini akan berlaku hingga tanggal {expiryDate}
          </p>
          <p className="text-lg">
            dengan kuota penggunaan sebanyak {quota} kali.
          </p>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
