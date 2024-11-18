import React from "react";
import { PemesananJasaSection } from "./sections/PemesananJasaSection";
import { pesanan } from "./constant";

const PemesananJasaModule = () => {
    const dataPesanan = pesanan;
  return (
    <div>
      <PemesananJasaSection orders={dataPesanan} />
    </div>
  );
};

export default PemesananJasaModule;
