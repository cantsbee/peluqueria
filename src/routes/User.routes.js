const express = require("express");
const {
	registerUser,
	loginUser,
	changeRole,
	deleteUser,
	addFavorite,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/cloudinary");

const router = express.Router();

// Register with optional image file under `image` field
router.post("/register", upload.single("image"), registerUser);
// Login
router.post("/login", loginUser);
// Change role (admin only)
router.put("/:id/role", auth, changeRole);
// Delete user (self or admin)
router.delete("/:id", auth, deleteUser);
// Add favorite item to user's array (no duplicates)
router.post("/:id/favorites", auth, addFavorite);

module.exports = router;