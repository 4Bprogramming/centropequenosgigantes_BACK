const { Router } = require("express");
const {profesionales,profesionalPorId,usuarios,usuarioPorId} = require('../Controllers')
const router = Router();


///Todas las rutas acá: 

//traer todos los  profesionales
router.get("/profesionales", profesionales);

// traer profesional por ID
router.get("/profesionales/:id", profesionalPorId);

//buscar todos los usuarios
router.get ('/usuarios',usuarios)

// buscar usuario por ID
router.get ('/usuarios/:id',usuarioPorId);


module.exports = router;