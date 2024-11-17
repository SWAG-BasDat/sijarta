"use client";

import React from "react";
import { useSearchParams } from "next/navigation"; // Use useSearchParams from next/navigation
import { PekerjaPage } from "@/modules/SubkategoriJasaModule/sections/SubkategoriJasaPekerjaSection";
import { PenggunaPage } from "@/modules/SubkategoriJasaModule/sections/SubkategoriJasaPenggunaSection";
import { subkategoriData } from "@/modules/SubkategoriJasaModule/constant";

const SubkategoriJasaModule = () => {
  const SubkategoriJasaPenggunaPage = subkategoriData.penggunaPage;
  const SubkategoriJasaPekerjaPage = subkategoriData.pekerjaPage;
  const searchParams = useSearchParams(); // Get search parameters
  const role = searchParams.get("role"); // Get the 'role' query parameter from the URL

  // Conditional rendering based on role
  const renderPage = () => {
    if (role === "pengguna") {
      return <PenggunaPage data={SubkategoriJasaPenggunaPage} />;
    } else if (role === "pekerja") {
      return <PekerjaPage data={SubkategoriJasaPekerjaPage} isJoined={false} />;
    } else {
      return <div>Role not found</div>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default SubkategoriJasaModule;
