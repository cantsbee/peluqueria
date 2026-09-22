require("dotenv").config();
const mongoose = require("mongoose");
const Peluqueria = require("../models/Peluqueria.model");

const sample = [
  {
    nombre: "Peluquería Central",
    direccion: "Calle Mayor, 1",
    telefono: "600111222",
    email: "central@example.com",
    descripcion: "Peluquería céntrica con servicio profesional",
  },
  {
    nombre: "Estilo & Corte",
    direccion: "Avenida del Sol, 12",
    telefono: "600333444",
    email: "estiloycorte@example.com",
    descripcion: "Estética y corte moderno",
  },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    const all = await Peluqueria.find();
    if (all.length) await Peluqueria.collection.drop();
    await Peluqueria.insertMany(sample);
    console.log("Seed completed");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
};

if (require.main === module) run();

module.exports = run;
