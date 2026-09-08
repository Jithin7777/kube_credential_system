import dotenv from "dotenv";
import mongoose from "mongoose";
import CredentialModel from "../models/Credential";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
});

beforeEach(async () => {
  await CredentialModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});