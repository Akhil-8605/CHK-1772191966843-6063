import express from "express";
import ImageKit from "imagekit";
import "dotenv/config";

const app = express();

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

// Allow cross-origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/auth", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// Use the environment port or default to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Live at Port ${PORT}`);
});
