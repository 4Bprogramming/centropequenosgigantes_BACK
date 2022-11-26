// aqui van a ir todos los cotroladores Profesionales, Usuario, etc. y distintos verbos GET POST PUT DELETE

//importamos lo modelos de la DB
const {
  Profesional,
  Usuario,
  Turno,
  Admin,
  Historiaclinica,
} = require("../db");
//importamos funcion para hashear
const { hashPassword, checkPassword } = require("../helpers/handlePassword.js");
const { tokenSign } = require("../helpers/jwt");

//********************************************************GET**************************************** */

//traer todos los profesionales
const profesionales = async (req, res, next) => {
  try {
    const profesionales = await Profesional.findAll({ include: Turno });
    if (profesionales.length === 0)
      return res
        .status(404)
        .send({ message: "No se encontraron profesionales" });
    res.status(200).send(profesionales);
  } catch (e) {
    next(e);
  }
};

// Traer profesional por ID
const profesionalPorId = async (req, res, next) => {
  const { idProfesional } = req.params;
  try {
    const profesionalXiD = await Profesional.findByPk(idProfesional, {
      include: Turno,
    });
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
    const usuarios = await Usuario.findAll({
      include: [{ model: Turno, include: [Historiaclinica] }],
    });
    if (usuarios.length === 0)
      return res.status(404).send({ message: "No se encontraron usuarios" });
    res.status(200).send(usuarios);
  } catch (e) {
    next(e);
  }
};

//traer usuario por Email (PK)
const usuarioPorEmail = async (req, res, next) => {
  const { email } = req.params;
  try {
    const usuarioPorMail = await Usuario.findByPk(email, {
      include: [{ model: Turno, include: [Historiaclinica] }],
    });
    if (usuarioPorMail) {
      res.status(200).send(usuarioPorMail);
    } else {
      return res
        .status(404)
        .send({ message: "El usuario buscado por email no se encontró" });
    }
  } catch (e) {
    next(e);
  }
};

/// historias clinicas
const traerHistoriaClinica = async (req,res,next)=>{
  try {
    const historiasClinicas = await Historiaclinica.findAll();
    if(!historiasClinicas) return res.status(404).send({message:'No se encontró ninguna historia clínica'});
      res.status(200).send(historiasClinicas);
  } catch (e) {
    next(e)
  }
}

//Historia clinica por ID

const traerHistoriaClinicaPorID = async(req,res,next)=>{
  try {
    const {id} = req.params;
    const HistoriaClinicaPorID = await Historiaclinica.findByPk(id);
    if(!HistoriaClinicaPorID) return res.status(404).send({message:'La historia clinica por id no ha sido encontrada.'});
     res.status(200).send({message:'La historia clinica ha sido encontrada',HistoriaClinica:HistoriaClinicaPorID})
  } catch (e) {
      next(e)
  }
}


// traer todos los turnos

const traerTurnos = async (req,res,next)=>{
  try {
    const todosLosTurnos = await Turno.findAll();
    if(!todosLosTurnos) return res.status(404).send({message:'No se encontró ningun turno'});
      res.status(200).send(todosLosTurnos);
  } catch (e) {
    next(e)
  }
}

//  trae un turno por ID
const traerTurnoPorID = async (req,res,next)=>{
  try {
    const {id} = req.params;
    const turnoPorId = await Turno.findByPk(id);
    if(!turnoPorId) return res.status(404).send({message:'El turno por id no ha sido encontrado.'});
     res.status(200).send({message:'El turno ha sido encontrado',turno:turnoPorId})
    

  } catch (e) {
    next(e)
  }
}





// *********************************************** POSTS ********************************************//

//crear usuario
const crearUsuario = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const usuarioCreado = await Usuario.create({
      ...req.body,
      password: hashedPassword,
    });

    if (!usuarioCreado)
      return res.status(418).send({ message: "El usuario no se pudo crear" });
    res.status(201).send({ message: "Usuario creado con exito!" });
  } catch (e) {
    next(e);
  }
};

//crear profesional
const crearProfesional = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const profesionalCreado = await Profesional.create({
      ...req.body,
      password: hashedPassword,
    });
    if (!profesionalCreado)
      return res
        .status(418)
        .send({ message: "El profesional no se pudo crear" });
    res.status(201).send({ message: "Profesional creado con exito!" });
  } catch (e) {
    next(e);
  }
};

//Crear turno
const crearTurno = async (req, res, next) => {
  try {
    const turnoCreado = await Turno.create({ ...req.body });
    if (!turnoCreado)
      return res.status(418).send({ message: "El turno no pudo ser creado" });
    res.status(201).send({ message: "Turno creado con exito!" });
  } catch (e) {
    next(e);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password, select } = req.body;

    //chequeamos el SELECT
    if (select === "usuario") {
      var respuestaDB = await Usuario.findByPk(email, {
        include: { model: Turno },
      });
    } else if (select === "profesional") {
      var respuestaDB = await Profesional.findOne({
        where: { email: email },
        include: { model: Turno },
      });
    } else if (select === "administrador") {
      var respuestaDB = await Admin.findByPk(email);
    } else {
      return res.status(404).send({
        message: `el select debe ser 'usuario', 'profesional' o 'administrador' el valor fue ${select}`,
      });
    }

    // olvido password, crea uno nuevo
    const passwordOlvidado = async(req,res,next)=>{
      try{
        
      }catch(e){
        next(e)
      }
    }

    //si no existe respuesta.
    if (!respuestaDB)
      return res
        .status(401)
        .send({ message: "El usuario no se encontró con ese email." });
    const passwordCorrecto = await checkPassword(
      password,
      respuestaDB.password
    );

    //si el password es correcto manda usuario y token
    if (passwordCorrecto) {
      const tokenDeAcceso = await tokenSign(respuestaDB.dataValues, "2h");
      res.status(200).send({ usuario: respuestaDB, token: tokenDeAcceso });
    } else {
      //password incorrecto
      res.status(401).send({
        message: `El usuario ${email} no está autorizado a ingresar password erróneo.`,
      });
    }
  } catch (e) {
    next(e);
  }
};

//Crear admin
const crearAdmin = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const nuevoAdmin = await Admin.create({
      ...req.body,
      password: hashedPassword,
    });
    if (!Admin)
      return res
        .status(401)
        .send({ message: "El usuario no ha podido ser creado, lo siento. " });
    res
      .status(200)
      .send({ message: "Aministrador, creado con éxito", nuevoAdmin });
  } catch (e) {
    next(e);
  }
};

// Crear historia clinica
const crearHistoriaClinica = async (req, res, next) => {
  try {
    const historiaClinicaCreada = await Historiaclinica.create({ ...req.body });
    if (!historiaClinicaCreada)
      return res
        .status(401)
        .send({ message: "La historia clinica no pudo ser creada." });
    res.status(200).send({
      message: "Historia clinica creada con exito.",
      historiaClinicaCreada,
    });
  } catch (e) {
    next(e);
  }
};

//********************************************PUT******************************************/
// Reservar el turno por el usuario.

const modificarTurno = async (req, res, next) => {
  try {
    const { id, estado, email } = req.body;
    const turno = await Turno.findByPk(id);

    //reservar (booked)
    if (estado === "reservado" && email) {
      await turno?.update({
        estado: estado,
      });
      res.status(200).send({
        message: "El turno fue reservado pero falta realizar el pago",
      });
    }
    //turno ya pago pasa a "pendiente" hasta ser atendido.
    else if (estado === "pendiente" && email) {
      await turno?.update({
        estado: estado,
        usuarioEmail: email,
      });
      res
        .status(200)
        .send({ message: "¡Turno reservado el pago fue exitoso!" });
    }
    //turno cancelado por pago no completo
    else if (estado === "disponible" && email) {
      await turno?.update({
        estado: estado,
        usuarioEmail: null,
      });
      res.status(200).send({ message: "¡No se procesó el pago!" });
    }
    //turno completado con historica clinica
    else if (estado === "finalizado" && email) {
      await turno?.update({
        estado: estado,
        usuarioEmail: email,
      });
      res.status(200).send({ message: "¡Turno finalizado!" });
    }
    //usuario canceló el turno
    else if (estado === "cancelado" && email) {
      await turno?.update({
        estado: estado,
        usuarioEmail: email,
      });
      res.status(200).send({ message: "¡Turno cancelado por el usuario!" });
    } else {
      res.status(404).send("Hubo un problema con la modificación del turno");
    }
  } catch (e) {
    next(e);
  }
};

const editarprofesional = async (req, res, next) => {
  try {
    const { idProfesional } = req.params;
    const profesionalEditado = await Profesional.findByPk(idProfesional);
    if (!profesionalEditado)
      return res
        .status(404)
        .send({ message: "No se pudo encontrar el profesional para editarlo" });
    profesionalEditado?.update({ ...req.body });
    res.status(201).send({
      message: "El profesional fue editado",
      profesional: profesionalEditado,
    });
  } catch (e) {
    next(e);
  }
};

//editar usuario
const editarusuario = async (req, res, next) => {
  try {
    const { email } = req.params;
    const usuarioEditado = await Usuario.findByPk(email);
    if (!usuarioEditado)
      return res
        .status(404)
        .send({ message: "No se pudo encontrar el usuario para editarlo" });
    usuarioEditado?.update({ ...req.body });
    res
      .status(201)
      .send({ message: "El usuario fue editado", usuario: usuarioEditado });
  } catch (e) {
    next(e);
  }
};

//*********************************DAR DE BAJA O DE ALTA**************************** */

const debajaOdealta = async (req, res, next) => {
  try {
    let bajaOalta = null;
    const { email } = req.params;
    const { select } = req.body;

    //chequeamos el SELECT y damos de baja el usuario

    if (select === "usuario") {
      var resDB = await Usuario.findByPk(email);
      
      
    } else if (select === "profesional") {
      var resDB = await Profesional.findOne({ where: { email: email } });
     
    } else if (select === "administrador") {
      var resDB = await Admin.findByPk(email);
    } else{
      return res.status(404).send({
        message: `el select debe ser 'usuario', 'profesional' o 'administrador' el valor fue ${select}`,
      });
    }
    
    if (!resDB){
      return res.status(404).send({
        message: `Usted esta buscando a un ${select} que no se encuentra con ese email.`
      });
    }else{
      resDB.active === true ? bajaOalta = 'eliminado' : bajaOalta = 'recuperado';
      await resDB?.update({ active: !resDB.active });
      res
        .status(200)
        .send({ message: `El ${select} fue ${bajaOalta} con éxito.` });
    }
   
  } catch (e) {
    next(e);
  }
};

module.exports = {
  profesionales,
  profesionalPorId,
  usuarios,
  usuarioPorEmail,
  crearUsuario,
  crearProfesional,
  crearTurno,
  modificarTurno,
  login,
  crearAdmin,
  editarprofesional,
  editarusuario,
  crearHistoriaClinica,
  debajaOdealta,
  traerHistoriaClinica,
  traerHistoriaClinicaPorID,
  traerTurnos,
  traerTurnoPorID
};
