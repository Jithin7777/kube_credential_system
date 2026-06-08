import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CredentialProvider } from "./context/CredentialContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CredentialProvider>
      {" "}
      <App />
    </CredentialProvider>
  </StrictMode>
);
