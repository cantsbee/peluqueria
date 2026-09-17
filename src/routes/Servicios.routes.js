const express = require("express");
const { getServicios, getServicioById, createServicio, updateServicio, deleteServicio } = require("../controllers/servicio.controller");

const router = express.Router();

router.get("/", getServicios);
router.get("/:id", getServicioById);
router.post("/", createServicio);
router.put("/:id", updateServicio);
router.delete("/:id", deleteServicio);

module.exports = router;