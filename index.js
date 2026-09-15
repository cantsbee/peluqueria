(dotenv.config());
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));