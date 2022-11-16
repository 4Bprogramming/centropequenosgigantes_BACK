const { Router } = require("express");
const {profesionales,profesionalPorId} = require('../Controllers')
const router = Router();


///Todas las rutas acá: 

//traer todos los  profesionales
router.get("/profesionales", profesionales);

// traer profesional por ID
router.get("/profesionales/:id", profesionalPorId);





module.exports = router;