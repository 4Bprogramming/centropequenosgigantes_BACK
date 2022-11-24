const { Router } = require("express");
const {profesionales,profesionalPorId,usuarios,usuarioPorEmail,crearUsuario,crearProfesional,crearTurno,modificarTurno,login,crearAdmin,editarprofesional,editarusuario,crearHistoriaClinica,debajaOdealta,traerHistoriaClinica,traerTurnos} = require('../Controllers')
const router = Router();
//importamos helper para validar el body
const {validadorDeDatos,validadorDeAdmin,sanitizador} = require('../helpers/validations');

//validador de token para ingresar a las rutas
const {tokenVerify} = require('../helpers/jwt')

///Todas las rutas acá: 

//traer todos los  profesionales
router.get("/profesionales", profesionales);

// traer profesional por ID
router.get("/profesionales/:idProfesional",profesionalPorId);

//buscar todos los usuarios
router.get ('/usuarios',tokenVerify,usuarios)

// buscar usuario por Email
router.get ('/usuarios/:email',tokenVerify,usuarioPorEmail);

//traer historias clinicas
router.get('/historiaclinica',traerHistoriaClinica)

// traer todos los turnos
router.get('/turnos',traerTurnos)


//***POSTS*****/
router.post('/usuarios',validadorDeDatos,crearUsuario);
router.post('/profesionales',validadorDeDatos,tokenVerify,crearProfesional);
router.post('/turnos',tokenVerify,crearTurno);
//login
router.post('/login',login);
// Crear un Admin Admin
router.post('/crearadmin',validadorDeAdmin,tokenVerify,crearAdmin);

//Crear historia clinica
router.post('/historiaclinica',crearHistoriaClinica)


//***PUT --> (UPDATE)***/
router.put('/turnos',tokenVerify,modificarTurno);
router.put('/editarprofesional/:idProfesional',sanitizador,editarprofesional)
router.put('/editarusuario/:email',sanitizador,editarusuario)

//dar de baja usuario, admin o profesional --> se modifica el active a False.
router.put('/altabaja/:email',debajaOdealta);









module.exports = router;
