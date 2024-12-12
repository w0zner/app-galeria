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

const list = (req, res) => {
    try {
        res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        
    }
}

module.exports = {create, list}