const { check, validationResult } = require("express-validator");

// Express validator se usa para validar datos que viene desde el req.body

const validadorDeDatos = [
    //validamos nombre
    check("nombre")
    .trim()
    .notEmpty().withMessage("Campo del nombre vacío")
    .isAlpha('es-ES', { ignore: ' ' }).withMessage("Ingrese solo letras")
    .isLength({ min: 2, max: 90 }).withMessage("Caractéres mínimos: min 2, max 90"),

    //validamos apellido
    check("apellido")
    .trim()
    .notEmpty().withMessage("Campo del apellido vacío")
    .isAlpha('es-ES', { ignore: ' ' }).withMessage("Ingrese sólo letras")
    .isLength({ min: 2, max: 90 }).withMessage("Caractéres mínimos: min 2, max 90"),

    //validamos email
    
    check("emailProfesional")
    .trim()
    .notEmpty().withMessage("Este campo no puede estar vacío")
    .isEmail().withMessage("El email debe ser válido")
    .normalizeEmail(),


    //validamos password
    check("password")
    .trim()
    .notEmpty().withMessage("Se necesita un password obligatorio")
    .isLength({ min: 8, max: 15 }).withMessage("El password debe tener entre: min 8, max 15"),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next() //si pasa validaciones, sigue hacia el controlador
        } catch (err) {
            res.status(400).send({ errors: err.array() })
        }
    }
]

const validadorDeDatosUsuario = [
    //validamos nombre
    check("nombre")
    .trim()
    .notEmpty().withMessage("Campo del nombre vacío")
    .isAlpha('es-ES', { ignore: ' ' }).withMessage("Ingrese solo letras")
    .isLength({ min: 2, max: 90 }).withMessage("Caractéres mínimos: min 2, max 90"),

    //validamos apellido
    check("apellido")
    .trim()
    .notEmpty().withMessage("Campo del apellido vacío")
    .isAlpha('es-ES', { ignore: ' ' }).withMessage("Ingrese sólo letras")
    .isLength({ min: 2, max: 90 }).withMessage("Caractéres mínimos: min 2, max 90"),

    //validamos email
    check("emailUsuario")
    .trim()
    .notEmpty().withMessage("Este campo no puede estar vacío")
    .isEmail().withMessage("El email debe ser válido")
    .normalizeEmail(),


    //validamos password
    check("password")
    .trim()
    .notEmpty().withMessage("Se necesita un password obligatorio")
    .isLength({ min: 8, max: 15 }).withMessage("El password debe tener entre: min 8, max 15"),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next() //si pasa validaciones, sigue hacia el controlador
        } catch (err) {
            res.status(400).send({ errors: err.array() })
        }
    }
]


module.exports = {validadorDeDatos,validadorDeDatosUsuario}