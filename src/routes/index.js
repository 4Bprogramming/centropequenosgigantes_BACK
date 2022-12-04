const { Router } = require("express");
const {profesionales,profesionalPorId,usuarios,usuarioPorEmail,crearUsuario,crearProfesional,crearTurno,modificarTurno,login,crearAdmin,editarprofesional,editarusuario,crearHistoriaClinica,debajaOdealta,traerHistoriaClinica,traerHistoriaClinicaPorID,traerTurnos,traerTurnoPorID,passwordOlvidado,resetPassword} = require('../Controllers')
const router = Router();
//importamos helper para validar el body
const {validadorDeDatos,validadorDeAdmin,sanitizador} = require('../helpers/validations');

//validador de token para ingresar a las rutas
const {tokenVerify} = require('../helpers/jwt')

///Todas las rutas acá: 

//traer todos los  profesionales
router.get("/profesionales",tokenVerify, profesionales);

// traer profesional por ID
router.get("/profesionales/:idProfesional",tokenVerify,profesionalPorId);

//buscar todos los usuarios
router.get ('/usuarios',tokenVerify,usuarios)

// buscar usuario por Email
router.get ('/usuarios/:email',tokenVerify,usuarioPorEmail);

//traer historias clinicas
router.get('/historiaclinica',tokenVerify,traerHistoriaClinica);

//traer historia clinica por ID
router.get('/historiaclinica/:id',tokenVerify,traerHistoriaClinicaPorID)

// traer todos los turnos
router.get('/turnos',tokenVerify,traerTurnos);

// traer turno por ID
router.get('/turnos/:id',tokenVerify,tokenVerify,traerTurnoPorID);



//***POSTS*****/
router.post('/usuarios',validadorDeDatos,tokenVerify,crearUsuario);
router.post('/profesionales',validadorDeDatos,tokenVerify,crearProfesional);
router.post('/turnos',tokenVerify,crearTurno);
//login
router.post('/login',login);
// Crear un Admin Admin
router.post('/crearadmin',validadorDeAdmin,tokenVerify,crearAdmin);

//Crear historia clinica
router.post('/historiaclinica',tokenVerify,crearHistoriaClinica)


//***PUT --> (UPDATE)***/
router.put('/turnos',tokenVerify,modificarTurno);
router.put('/editarprofesional/:idProfesional',sanitizador,tokenVerify,editarprofesional)
router.put('/editarusuario/:email',sanitizador,tokenVerify,editarusuario)

//dar de baja usuario, admin o profesional --> se modifica el active a False.
router.put('/altabaja/:email',tokenVerify,debajaOdealta);


//***SECCION SOLO PARA PASSWORD y NODEMAILER */
// password olvidado
router.post("/password-olvidado", passwordOlvidado);

//una vez hace clic en el link lo lleva a una form que debe llenar 
//y esta form se manda a este post
router.post('/resetPassword',tokenVerify,resetPassword);
//****************************************************/

module.exports = router;
