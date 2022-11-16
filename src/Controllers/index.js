
// aqui van a ir todos los cotroladores Profesionales, Usuario, etc. y distintos verbos GET POST PUT DELETE

//importamos lo modelos de la DB
const {Profesional} = require('../db')

//traer todos los profesionales
const profesionales = async (req, res, next) => {
    try {
      const profesionales = await Profesional.findAll();
      if (profesionales.length === 0)
        return res.status(404).send({ message: "No se encontró nigún profesional" });
      res.status(200).send(profesionales);
    } catch (e) {
      next(e);
    }
  };





  // Traer profesional por ID
const profesionalPorId = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const profesionalXiD = await Profesional.findByPk(id);
        if(profesionalXiD){
            res.status(200).send(profesionalXiD);
        }else{
            return res.status(404).send({message: 'El profesional por Id no se encontró'})
        }
    } catch (e) {
        next(e);
    }
}



module.exports = {
    profesionales,
    profesionalPorId
}