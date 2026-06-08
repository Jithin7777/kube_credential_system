import request from "supertest";
import app from "../app";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(
  __dirname,
  "..",
  "..",
  "shared-data",
  "credentials.json"
);

beforeEach(() => {
  fs.writeFileSync(DB_PATH, "[]");
});

describe("Issuance API", () => {
  it("should issue a new credential", async () => {
    const res = await request(app)
      .post("/issue")
      .send({ name: "Jithin", email: "jithin@gmail.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.credential.id).toBeDefined();
    expect(res.body.credential.worker).toBeDefined();
    expect(res.body.credential.timestamp).toBeDefined();
  });

  it("should not issue duplicate credential", async () => {
    await request(app)
      .post("/issue")
      .send({ name: "Jithin", email: "jithin@gmail.com" });

    const res = await request(app)
      .post("/issue")
      .send({ name: "Jithin", email: "jithin@gmail.com" });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Credential already exists");
    expect(res.body.credential.id).toBeDefined();
  });
});
