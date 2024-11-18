import React from "react";
import TransaksiMyPay from "./sections/TransaksiMyPaySection";

const TransaksiMyPayModule = () => {
  return (
    <TransaksiMyPay userType="Pengguna" userName="John Doe" userBalance={150000} />
  );
};

export default TransaksiMyPayModule;
