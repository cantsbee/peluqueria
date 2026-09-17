const mongoose = require("mongoose");

const peluqueriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true,
    },
    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Introduce un email válido"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    horario: {
      lunesViernes: { type: String, trim: true },
      sabado: { type: String, trim: true },
      domingo: { type: String, trim: true, default: "Cerrado" },
    },
    servicios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Servicio",
      },
    ],
    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Peluqueria = mongoose.model("Peluqueria", peluqueriaSchema);

module.exports = Peluqueria;