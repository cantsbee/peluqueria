const express = require("express");
const { getPeluqueria,
     getPeluqueriaById,
      createPeluqueria,
       updatePeluqueria,
        deletePeluqueria } = require("../controllers/peluqueria.controller");

const router = express.Router();

router.get("/", getPeluqueria);
router.get("/:id", getPeluqueriaById);
router.post("/", createPeluqueria);
router.put("/:id", updatePeluqueria);
router.delete("/:id", deletePeluqueria);

module.exports = router;