
// aqui van a ir todos los cotroladores Profesionales, Usuario, etc. y distintos verbos GET POST PUT DELETE

//importamos lo modelos de la DB
const {Profesional} = require('../db')

//traer todos los profesionales
const profesionales = async (req, res, next) => {
    try {
      const profesional = await Profesional.findAll();
      if (profesional.length === 0)
        return res.status(404).send({ message: "No se encontró nigún profesional" });
      res.status(200).send(profesional);
    } catch (e) {
      next(e);
    }
  };






module.exports = {
    profesionales
}