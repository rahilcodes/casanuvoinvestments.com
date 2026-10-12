import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesView } from "@/components/listings/PropertiesView";

export const metadata: Metadata = {
  title: "Residential Properties",
  description:
    "Residential properties in Guyana from Casa Nuvo Investments. Furnished rentals and homes for sale across Georgetown and Demerara. Looking for warehouses, land or offices? See our commercial services.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesView />
    </Suspense>
  );
}
