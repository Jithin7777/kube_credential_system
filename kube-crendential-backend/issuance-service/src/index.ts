// import app from "./app";

// const PORT = parseInt(process.env.PORT || "5000", 10);
// app.listen(PORT, () => console.log(`Issuance service running on port ${PORT}`));


import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/database";

const PORT = parseInt(process.env.PORT || "5000", 10);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Issuance service running on port ${PORT}`);
  });
};

startServer();