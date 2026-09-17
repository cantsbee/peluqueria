const Peluqueria = require('../models/peluqueria.model');

const getPeluqueria = async (req, res) => {
    try {
        const peluqueria = await Peluqueria.find();
        res.json(peluqueria);
    } catch (error) {
        console.error('Error al obtener la peluquería:', error);
        res.status(500).json({ error: 'Error al obtener la peluquería' });
    }
};

const postPeluqueria = async (req, res) => {
    try {
        const { nombre, direccion, telefono, email, descripcion, horario } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!nombre || !direccion || !telefono) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const nueva = new Peluqueria({ nombre, direccion, telefono, email, descripcion, horario });
        const saved = await nueva.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error('Error al crear la peluquería:', error);
        res.status(500).json({ error: 'Error al crear la peluquería' });
    }
};
const updatePeluqueria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono, email, descripcion, horario } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!nombre || !direccion || !telefono) {
            return res.status(400).json({ error: "Faltan campos requeridos" });
        }

        const peluqueriaActualizada = await Peluqueria.findByIdAndUpdate(
            id,
            { nombre, direccion, telefono, email, descripcion, horario },
            { new: true }
        );

        if (!peluqueriaActualizada) {
            return res.status(404).json({ error: "Peluquería no encontrada" });
        }

        res.json(peluqueriaActualizada);
    } catch (error) {
        console.error("Error al actualizar la peluquería:", error);
        res.status(500).json({ error: "Error al actualizar la peluquería" });
    }
}


/**
 * GET /api/movies -> Esto son los endpoints que aplicaremos posteriormente
 * - Obtiene todas las películas almacenadas.
 * - Si todo va bien, responde 200 con el array de películas.
 */
const getPeluqueria = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las peluquerías" });
  }
};

/**
 * GET /api/movies/:id
 * - Busca una película por su ID.
 * - Si no existe, devuelve 404.
 * - Si el formato del ID es inválido, devuelve 400.
 */
const getPeluqueriaById = async (req, res) => {
  try {
    const peluqueria = await Peluqueria.findById(req.params.id);
    if (!peluqueria) {
      return res.status(404).json({ error: "Peluquería no encontrada" });
    }
    res.status(200).json(peluqueria);
  } catch (err) {
    res.status(400).json({ error: "ID inválido o error en la búsqueda" });
  }
};

/**
 * POST /api/movies
 * - Crea una nueva película.
 * - Aplica las validaciones del Schema automáticamente.
 * - Si la creación es correcta, devuelve 201 con el documento creado.
 */
const createPeluqueria = async (req, res) => {
  try {
    const peluqueria = await Peluqueria.create(req.body);
    res.status(201).json(peluqueria);
  } catch (err) {
    res.status(400).json({
      error: "Error al crear la peluquería",
      detalles: err.message,
    });
  }
};

const updatePeluqueria = async (req, res) => {
  try {
    const updated = await Peluqueria.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Peluquería no encontrada" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({
      error: "Error al actualizar la peluquería",
      detalles: err.message,
    });
  }
};

const deletePeluqueria = async (req, res) => {
  try {
    const deleted = await Peluqueria.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Peluquería no encontrada" });
    }
    res.status(200).json({ mensaje: "Peluquería eliminada correctamente" });
  } catch (err) {
    res.status(400).json({
      error: "Error al eliminar la peluquería",
      detalles: err.message,
    });
  }
};

module.exports = {
  getPeluqueria,
  getPeluqueriaById,
  createPeluqueria,
  updatePeluqueria,
  deletePeluqueria,
};