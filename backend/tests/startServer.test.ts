import { startServer } from "../src/startServer";
import app from "../src/server";
import connectDB from "../src/config/db";

jest.mock("../src/server", () => ({
  __esModule: true,
  default: {
    listen: jest.fn((_, cb) => cb && cb()),
  },
}));

jest.mock("../src/config/db");

describe("startServer", () => {
  it("✅ should connect to DB and start server", async () => {
    await startServer();

    expect(connectDB).toHaveBeenCalled();
    expect(app.listen).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Function)
    );
  });
});
