const User = require("../models/user.model");
const { generateToken } = require("../utils/token");
const { uploadBuffer, cloudinary } = require("../middleware/cloudinary");

// Register: always create with role 'user' and optional image upload
const registerUser = async (req, res) => {
  try {
    const { name, email, password, emoji } = req.body;
    if (!name || !email || !password || !emoji)
      return res.status(400).json({ error: "Missing required fields" });

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ error: "El usuario ya existe" });

    const user = new User({ name, email, password, emoji, role: "user" });

    // If there's an uploaded file buffer (handled by multer), upload to Cloudinary
    if (req.file && req.file.buffer) {
      const result = await uploadBuffer(req.file.buffer, "users");
      user.image = { url: result.secure_url, public_id: result.public_id };
    }

    const saved = await user.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Error registrando al usuario" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password))
      return res.status(401).json({ error: "Credenciales inválidas" });

    const token = generateToken(user._id.toString(), user.email);
    return res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(400).json({ error: "Error en login" });
  }
};

// Change role - only admin can do this
const changeRole = async (req, res) => {
  try {
    const requester = req.user; // set by auth middleware
    if (!requester || requester.role !== "admin")
      return res.status(403).json({ error: "Only admins can change roles" });

    const { id } = req.params;
    const { role } = req.body;
    if (!["user", "admin"].includes(role))
      return res.status(400).json({ error: "Invalid role" });

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "Error changing role" });
  }
};

// Delete user: self or admin. Also remove image from Cloudinary
const deleteUser = async (req, res) => {
  try {
    const requester = req.user;
    const { id } = req.params;

    if (!requester) return res.status(401).json({ error: "Unauthorized" });

    // only admin or the same user
    if (requester.role !== "admin" && requester.id !== id)
      return res.status(403).json({ error: "Forbidden" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // remove image in Cloudinary if present
    if (user.image && user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    await User.findByIdAndDelete(id);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(400).json({ error: "Error deleting user" });
  }
};

// Add related item to favorites array without duplicates
const addFavorite = async (req, res) => {
  try {
    const requester = req.user;
    const { id } = req.params; // user id
    const { itemId } = req.body; // Peluqueria id to add

    if (!requester) return res.status(401).json({ error: "Unauthorized" });

    // Only the owner or admin can modify their favorites
    if (requester.role !== "admin" && requester.id !== id)
      return res.status(403).json({ error: "Forbidden" });

    const updated = await User.findByIdAndUpdate(
      id,
      { $addToSet: { favorites: itemId } }, // addToSet prevents duplicates
      { new: true }
    ).populate("favorites");

    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: "Error adding favorite" });
  }
};

module.exports = { registerUser, loginUser, changeRole, deleteUser, addFavorite };