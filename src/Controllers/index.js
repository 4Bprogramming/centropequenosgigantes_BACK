// aqui van a ir todos los cotroladores Profesionales, Usuario, etc. y distintos verbos GET POST PUT DELETE

//importamos lo modelos de la DB
const { Profesional, Usuario } = require("../db");






//traer todos los profesionales
const profesionales = async (req, res, next) => {
  try {
    const profesionales = await Profesional.findAll();
    if (profesionales.length === 0)
      return res
        .status(404)
        .send({ message: "No se encontró nigún profesional" });
    res.status(200).send(profesionales);
  } catch (e) {
    next(e);
  }
};






// Traer profesional por ID
const profesionalPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profesionalXiD = await Profesional.findByPk(id);
    if (profesionalXiD) {
      res.status(200).send(profesionalXiD);
    } else {
      return res
        .status(404)
        .send({ message: "El profesional por Id no se encontró" });
    }
  } catch (e) {
    next(e);
  }
};






// traer todos los usuarios
const usuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0)
      return res.status(404).send({ message: "No se encontraron usuarios" });
    res.status(200).send(usuarios);
  } catch (e) {
    next(e);
  }
};






//traer usuario por ID
const usuarioPorId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const usuarioPorId = await Usuario.findByPk(id);
    if (usuarioPorId) {
      res.status(200).send(usuarioPorId);
    } else {
      return res
        .status(404)
        .send({ message: "El usuario buscado por ID no se encontró" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  profesionales,
  profesionalPorId,
  usuarios,
  usuarioPorId,
};
