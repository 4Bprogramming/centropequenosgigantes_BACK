const { Router } = require("express");
const {profesionales,profesionalPorId,usuarios,usuarioPorId,crearUsuario,crearProfesional,crearTurno,modificarTurno,login} = require('../Controllers')
const router = Router();
//importamos helper para validar el body
const {validadorDeDatos} = require('../helpers/validations');

//validador de token para ingresar a las rutas
const {tokenVerify} = require('../helpers/jwt')

///Todas las rutas acá: 

//traer todos los  profesionales
router.get("/profesionales",tokenVerify, profesionales);

// traer profesional por ID
router.get("/profesionales/:idProfesional",tokenVerify, profesionalPorId);

//buscar todos los usuarios
router.get ('/usuarios',tokenVerify,usuarios)

// buscar usuario por ID
router.get ('/usuarios/:idUsuario',tokenVerify,usuarioPorId);


//***POSTS*****/
router.post('/usuarios',validadorDeDatos,crearUsuario);
router.post('/profesionales',validadorDeDatos,crearProfesional);
router.post('/turnos',tokenVerify,crearTurno);
//login
router.post('/login',login)


//***UPDATE***/
router.put('/turnos',tokenVerify,modificarTurno);

module.exports = router;
