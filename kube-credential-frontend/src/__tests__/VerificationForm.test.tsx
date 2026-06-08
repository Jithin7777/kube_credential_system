import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import VerificationPage from "../pages/VerificationPage";
import { verifyCredential } from "../services/verificationService";

jest.mock("../services/verificationService");

describe("VerificationPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows success message when credential is valid", async () => {
    (verifyCredential as jest.Mock).mockResolvedValueOnce({
      verified: true,
      message: "Credential is valid",
      credential: { id: "12345", name: "Jithin", email: "jithin@example.com" },
    });

    render(<VerificationPage />);

    const idInput = screen.getByLabelText(/credential id/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /verify credential/i });

    fireEvent.change(idInput, { target: { value: "12345" } });
    fireEvent.change(emailInput, { target: { value: "jithin@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/credential is valid/i)).toBeInTheDocument();
    });
  });

  test("shows error message when credential is invalid", async () => {
    (verifyCredential as jest.Mock).mockResolvedValueOnce({
      verified: false,
      message: "Credential is invalid",
      credential: { id: "wrong-id", name: "N/A", email: "fake@example.com" },
    });

    render(<VerificationPage />);

    const idInput = screen.getByLabelText(/credential id/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /verify credential/i });

    fireEvent.change(idInput, { target: { value: "wrong-id" } });
    fireEvent.change(emailInput, { target: { value: "fake@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/credential is invalid/i)).toBeInTheDocument();
    });
  });
});
