const Servicio = require('../models/servicio.model');

const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.status(200).json(servicios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

const getServicioById = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.status(200).json(servicio);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido o error en la búsqueda' });
  }
};

const createServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracion } = req.body;
    if (!nombre || precio == null) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    const servicio = await Servicio.create({ nombre, descripcion, precio, duracion });
    res.status(201).json(servicio);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el servicio', detalles: err.message });
  }
};

const updateServicio = async (req, res) => {
  try {
    const updated = await Servicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar el servicio', detalles: err.message });
  }
};

const deleteServicio = async (req, res) => {
  try {
    const deleted = await Servicio.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.status(200).json({ mensaje: 'Servicio eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar el servicio', detalles: err.message });
  }
};

module.exports = {
  getServicios,
  getServicioById,
  createServicio,
  updateServicio,
  deleteServicio,
};