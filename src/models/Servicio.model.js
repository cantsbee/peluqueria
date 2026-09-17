const mongoose = require("mongoose");

const servicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del servicio es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    duracionMinutos: {
      type: Number,
      required: true,
      min: 1,
    },
    peluqueria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Peluqueria",
      required: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Servicio = mongoose.model("Servicio", servicioSchema);

module.exports = Servicio;