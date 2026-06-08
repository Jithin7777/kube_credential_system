/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import type { Credential } from "../types/credentialTypes";
import type { ReactNode } from "react";
type CredentialContextType = {
  lastIssued: Credential | null;
  setLastIssued: (credential: Credential | null) => void;
};

const CredentialContext = createContext<CredentialContextType>({
  lastIssued: null,
  setLastIssued: () => {},
});

export const CredentialProvider = ({ children }: { children: ReactNode }) => {
  const [lastIssued, setLastIssued] = useState<Credential | null>(null);

  return (
    <CredentialContext.Provider value={{ lastIssued, setLastIssued }}>
      {children}
    </CredentialContext.Provider>
  );
};

export const useCredential = () => useContext(CredentialContext);
