/// <reference types="jest" />
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import IssuanceForm from "../components/IssuanceForm";
import { CredentialProvider } from "@/context/CredentialContext";

test("renders IssuanceForm and submits", async () => {
  render(
    <CredentialProvider>
      <IssuanceForm />
    </CredentialProvider>
  );

  const nameInput = screen.getByPlaceholderText(/Enter name/i);
  const emailInput = screen.getByPlaceholderText(/Enter email address/i);
  const button = screen.getByRole("button", { name: /Issue Credential/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: "Jithin" } });
  fireEvent.change(emailInput, { target: { value: "jithin@example.com" } });

  expect(nameInput).toHaveValue("Jithin");
  expect(emailInput).toHaveValue("jithin@example.com");
});
