const Usuario = require('../models/usuario')

const create = async (req, res) => {
    try {
       const user = new Usuario(req.body)

       await user.save()
       
       res.status(201).json({
        message: 'Usuario creado',
        usuario: user
       })
    } catch (error) {
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const login = async (req, res) => {
    try {
        const {usuario, password} = req.body

        const existeUsuario = await Usuario.findOne({usuario})
        if(!existeUsuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        if(!existeUsuario.activo) {
            return res.status(404).json({
                message: 'Usuario se encuentra inactivo'
            })
        }
        
        res.status(200).json({
            message: 'Usuario logueado'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const list = (req, res) => {
    try {
        res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        
    }
}

module.exports = {create, list, login}