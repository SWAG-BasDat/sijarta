"use client";

import React from "react";
import { PekerjaPage } from "./sections/SubkategoriJasaPekerjaSection";
import { PenggunaPage } from "./sections/SubkategoriJasaPenggunaSection";
import { subkategoriData } from "./constant";
import { useSession } from "next-auth/react";

const SubkategoriJasaModule = () => {
  const SubkategoriJasaPenggunaPage = subkategoriData.penggunaPage;
  const SubkategoriJasaPekerjaPage = subkategoriData.pekerjaPage;
  const { data: session } = useSession();

  const isWorker = session?.user.isPekerja;

  return (
    <div>
      {isWorker ? (
        <>
          {/* Render WorkerPage */}
          <PekerjaPage />
        </>
      ) : (
        <>
          {/* Render UserPage */}
          <PenggunaPage />
        </>
      )}
    </div>
  );
};

export default SubkategoriJasaModule;
