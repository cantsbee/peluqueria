const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    emoji: { type: String, trim: true, required: true },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // 'this.password' contiene la contraseña en texto plano
  this.password = bcrypt.hashSync(this.password, 10); // 10 = nivel de coste
  next(); // continua con el guardado
});

const User = mongoose.model("User", userSchema);
module.exports = User;