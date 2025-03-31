import app from "./server";
import connectDB from "./config/db";

export const startServer = async () => {
  await connectDB(); // Now testable
  const PORT = parseInt(process.env.PORT || "5000", 10);
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
};

if (process.env.NODE_ENV !== "test") {
  startServer(); // Only run when not testing
}
