"use client";

import React from "react";
import { PekerjaPage } from "./sections/SubkategoriJasaPekerjaSection";
import { PenggunaPage } from "./sections/SubkategoriJasaPenggunaSection";
import { subkategoriData } from "./constant";

const SubkategoriJasaModule = () => {
  const SubkategoriJasaPenggunaPage = subkategoriData.penggunaPage;
  const SubkategoriJasaPekerjaPage = subkategoriData.pekerjaPage;

  return (
    <div>
      {/* Render UserPage */}
      <PenggunaPage data={SubkategoriJasaPenggunaPage} />

      {/* Render WorkerPage */}
      <PekerjaPage data={SubkategoriJasaPekerjaPage} isJoined={false} />
    </div>
  );
};

export default SubkategoriJasaModule;
