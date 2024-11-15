import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FailureModalProps } from "../interface";

export const FailureModal: React.FC<FailureModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            GAGAL
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-lg">
            Maaf, saldo Anda tidak cukup untuk membeli voucher ini.
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
