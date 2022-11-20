// aqui van a ir todos los cotroladores Profesionales, Usuario, etc. y distintos verbos GET POST PUT DELETE

//importamos lo modelos de la DB
const { Profesional, Usuario,Turno } = require("../db");
//importamos funcion para hashear
const {hashPassword} = require('../helpers/handlePassword.js')



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
    const profesionalXiD = await Profesional.findByPk(idProfesional,{ include: Turno });
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
    const usuarios = await Usuario.findAll({ include: Turno });
    if (usuarios.length === 0)
      return res.status(404).send({ message: "No se encontraron usuarios" });
    res.status(200).send(usuarios);
  } catch (e) {
    next(e);
  }
};


//traer usuario por ID
const usuarioPorId = async (req, res, next) => {
  const { idUsuario } = req.params;
  console.log('id del usuario--->',idUsuario)
 

  try {
    const usuarioPorId = await Usuario.findOne({where:{idUsuario:idUsuario,},include:{model:Turno}});
    if (usuarioPorId) {
      res.status(200).send(usuarioPorId);
    } else {
      return res
        .status(404)
        .send({ message: "El usuario buscado por ID no se encontró" });
    }
  } catch (e) {
    next(e);
  }
};



// **************** POSTS ************************//


//crear usuario
const crearUsuario = async (req,res,next)=>{
  try {
   
    const hashedPassword = await hashPassword(req.body.password);
    const usuarioCreado = await Usuario.create({...req.body,password:hashedPassword}); 

    if(!usuarioCreado)
      return res.status(418).send({message:'El usuario no se pudo crear'})
    res.status(201).send({message:'Usuario creado con exito!'});

  } catch (e) {
    next(e);
  }
};


//crear profesional
const crearProfesional = async(req,res,next)=>{
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const profesionalCreado = await Profesional.create({...req.body,password:hashedPassword});
    if(!profesionalCreado)
      return res.status(418).send({message:'El profesional no se pudo crear'})
    res.status(201).send({message:'Profesional creado con exito!'});
  } catch (e) {
    next(e)
  }
}

//Crear turno
const crearTurno = async(req,res,next)=>{
  try {
    const turnoCreado = await Turno.create({...req.body})
    if(!turnoCreado)
      return res.status(418).send({message:'El turno no pudo ser creado'})
    res.status(201).send({message:'Turno creado con exito!'});
  } catch (e) {
    next(e)
  }
}





//***********PUT**********/
// Reservar el turno por el usuario.

const modificarTurno = async(req,res,next)=>{
  try {
    const {id,estado,email} = req.body;
    const turno = await Turno.findByPk(id);

    //reservar (booked)
    if(estado === 'reservado' && email){
      await turno?.update({
        estado:estado,
      });
      res.status(200).send({message:'El turno fue reservado pero falta realizar el pago'});
    }
    //turno ya pago pasa a "pendiente" hasta ser atendido.   
    else if(estado === 'pendiente' && email){
      await turno?.update({
        estado:estado,
        usuarioEmail:email
      });
      res.status(200).send({message:'¡Turno reservado el pago fue exitoso!'});
    } 
    //turno cancelado por pago no completo
    else if(estado === 'disponible' && email){
      await turno?.update({
        estado:estado,
        usuarioEmail:null
      });
      res.status(200).send({message:'¡No se procesó el pago!'});
    }
    //turno completado con historica clinica
    else if(estado === 'finalizado' && email){
      await turno?.update({
        estado:estado,
        usuarioEmail:email
      });
      res.status(200).send({message:'¡Turno finalizado!'});
    }
    //usuario canceló el turno
    else if(estado === 'cancelado' && email){
      await turno?.update({
        estado:estado,
        usuarioEmail:email
      });
      res.status(200).send({message:'¡Turno cancelado por el usuario!'});
    }
    else{
       res.status(404).send("Hubo un problema con la modificación del turno");
    }
    
  
  } catch (e) {
    next(e)
  }
}


module.exports = {
  profesionales,
  profesionalPorId,
  usuarios,
  usuarioPorId,
  crearUsuario,
  crearProfesional,
  crearTurno,
  modificarTurno,
  
};
