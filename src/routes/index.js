const { Router } = require("express");
const {profesionales,profesionalPorId,usuarios,usuarioPorId,crearUsuario,crearProfesional,crearTurno,modificarTurno} = require('../Controllers')
const router = Router();
//importamos helper para validar el body
const {validadorDeDatos} = require('../helpers/validations');

///Todas las rutas acá: 

//traer todos los  profesionales
router.get("/profesionales", profesionales);

// traer profesional por ID
router.get("/profesionales/:idProfesional", profesionalPorId);

//buscar todos los usuarios
router.get ('/usuarios',usuarios)

// buscar usuario por ID
router.get ('/usuarios/:idUsuario',usuarioPorId);


//***POSTS*****/
router.post('/usuarios',validadorDeDatos,crearUsuario);
router.post('/profesionales',validadorDeDatos,crearProfesional);
router.post('/turnos',crearTurno);



//***UPDATE***/
router.put('/turnos',modificarTurno);

module.exports = router;
