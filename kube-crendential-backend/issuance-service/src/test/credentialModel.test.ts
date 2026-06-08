import fs from "fs";
import { getAllCredentials, saveCredential } from "../models/credentialModel";
import { Credential } from "../types/credentialTypes";

jest.mock("fs");

describe("credentialModel", () => {
  const mockPath = "/fake/path/credentials.json";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array if file does not exist", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    (fs.readFileSync as jest.Mock).mockReturnValue("[]");
    const result = getAllCredentials();
    expect(result).toEqual([]);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("should parse JSON if file exists", () => {
    const mockData = JSON.stringify([
      { id: "1", name: "Jithin", email: "test@test.com" },
    ]);
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    const result = getAllCredentials();
    expect(result).toEqual([
      { id: "1", name: "Jithin", email: "test@test.com" },
    ]);
  });

  it("should handle invalid JSON gracefully", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue("invalid-json");
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    const result = getAllCredentials();
    expect(result).toEqual([]);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("should save a new credential", () => {
    const newCredential: Credential = {
      id: "2",
      name: "Alwin",
      email: "alwin@gmail.com",
    };
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue("[]");
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    saveCredential(newCredential);

    const written = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(JSON.parse(written)).toEqual([newCredential]);
  });

  it("should update an existing credential", () => {
    const existing: Credential = {
      id: "3",
      name: "Old Name",
      email: "old@gmail.com",
    };
    const updated: Credential = { ...existing, name: "New Name" };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([existing]));
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    saveCredential(updated);

    const written = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(JSON.parse(written)).toEqual([updated]);
  });
});
