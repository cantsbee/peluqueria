require("dotenv").config();
const express = require("express");
// importar la función
const { connectDB } = require("./src/config/db");

const app = express();

app.use(express.json()); // permitir JSON en el body
const PeluqueriaRoutes = require("./src/routes/Peluqueria.routes");
app.use("/api/peluquerias", PeluqueriaRoutes);

const ServiciosRoutes = require("./src/routes/Servicios.routes");
app.use("/api/Servicios", ServiciosRoutes);

const UserRoutes = require("./src/routes/User.routes");
app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 8080;

// conectar con la bbdd y arrancar servidor tras conexión
connectDB()
  .then(() => {
    // 404: debe ir al FINAL de todas las rutas/middlewares
    app.use((req, res) => {
      res.status(404).json({ error: "Route not found" });
    });

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
