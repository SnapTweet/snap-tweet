import { connectTestDB, closeTestDB } from "../src/config/testDB";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

jest.setTimeout(15000); // Optional: increase timeout for slower connections
