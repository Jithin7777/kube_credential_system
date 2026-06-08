import fs from "fs";
import path from "path";
import { Credential } from "../types/verificationTypes";

const DB_PATH = path.join(
  __dirname,
  "..",
  "..",
  "shared-data",
  "credentials.json"
);

export function getAllCredentials(): Credential[] {
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]");

  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8").trim();
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse credentials.json:", err);
    fs.writeFileSync(DB_PATH, "[]");
    return [];
  }
}

export function saveCredential(credential: Credential) {
  const all = getAllCredentials();
  const index = all.findIndex(
    (c) => c.id === credential.id && c.email === credential.email
  );

  if (index !== -1) {
    all[index] = credential;
  } else {
    all.push(credential);
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(all, null, 2));
}
