import fs from "fs";
import { getAllCredentials, saveCredential } from "../models/verificationModel";
import { Credential } from "../types/verificationTypes";

jest.mock("fs");

describe("verificationModel", () => {
  const mockPath = "/fake/path/credentials.json";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array when file does not exist", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    const result = getAllCredentials();
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it("should parse and return credentials when file exists", () => {
    const mockData = JSON.stringify([{ id: "1", email: "test@gmail.com" }]);
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    const result = getAllCredentials();
    expect(result).toEqual([{ id: "1", email: "test@gmail.com" }]);
  });

  it("should handle invalid JSON gracefully", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue("invalid-json");
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    const result = getAllCredentials();
    expect(result).toEqual([]);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("should save a new credential when not found", () => {
    const newCredential: Credential = {
      id: "2",
      email: "new@gmail.com",
      name: "Jithin",
      timestamp: Date.now().toString(),
    };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue("[]");
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    saveCredential(newCredential);
    expect(fs.writeFileSync).toHaveBeenCalled();
    const written = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(JSON.parse(written)).toEqual([newCredential]);
  });

  it("should update existing credential if already present", () => {
    const existing: Credential = {
      id: "1",
      email: "old@gmail.com",
      name: "Old User",
      timestamp: "1000",
    };
    const updated: Credential = { ...existing, name: "Updated User" };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([existing]));
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    saveCredential(updated);
    const written = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(JSON.parse(written)).toEqual([updated]);
  });
});
