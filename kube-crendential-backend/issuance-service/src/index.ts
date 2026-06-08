import app from "./app";

const PORT = parseInt(process.env.PORT || "5000", 10);
app.listen(PORT, () => console.log(`Issuance service running on port ${PORT}`));
