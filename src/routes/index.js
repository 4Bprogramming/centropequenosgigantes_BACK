const { Router } = require("express");
const {profesionales} = require('../Controllers')
const router = Router();


///Todas las rutas acá: 

//traer todos los  profesionales
router.get("/profesionales", profesionales);





module.exports = router;