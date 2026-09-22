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
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peluqueria",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compareSync(candidate, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
