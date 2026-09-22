const jwt = require("jsonwebtoken");

// Generar token con los datos del usuario
const generateToken = (id, email) => {
  return jwt.sign(
    { id, email }, // información que se incluirá en el payload
    process.env.JWT_SECRET, // clave secreta
    { expiresIn: "1d" } // duración del token (1 día)
  );
};

// Verificar si un token es válido
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };