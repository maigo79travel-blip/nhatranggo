"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { TransferVehicle } from "./transfer-options";

const VehicleSelectionContext = createContext({
  vehicle: "4cho" as TransferVehicle,
  selectVehicle: (_vehicle: TransferVehicle) => {},
});

export function TransfersVehicleSelection({
  children,
}: {
  children: ReactNode;
}) {
  const [vehicle, selectVehicle] = useState<TransferVehicle>("4cho");
  return (
    <VehicleSelectionContext.Provider value={{ vehicle, selectVehicle }}>
      {children}
    </VehicleSelectionContext.Provider>
  );
}

export function useTransferVehicle() {
  return useContext(VehicleSelectionContext);
}
