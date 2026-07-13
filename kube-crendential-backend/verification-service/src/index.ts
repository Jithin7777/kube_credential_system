// import app from "./app";

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`Verification service running on port ${PORT}`);
// });


import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Verification service running on port ${PORT}`);
  });
};

startServer();