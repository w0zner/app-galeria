const Usuario = require('../models/usuario')
const jwt = require('../utils/jwt')
const bcrypt = require('bcryptjs')

const create = async (req, res) => {
    const {usuario, password} = req.body
    try {
        const existeUsuario = await Usuario.findOne({usuario})

        if(existeUsuario) {
            return res.status(400).json({
                message: 'Usuario ya existente'
            })
        }

       const user = new Usuario(req.body)

       const salt = bcrypt.genSaltSync()
       user.password = bcrypt.hashSync(password, salt)

       await user.save()
       
       res.status(201).json({
        message: 'Usuario creado',
        usuario: user
       })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const update = async(req, res) => {
    try {
        const id = req.params.id
        const userId = jwt.verifyUserToken(req.headers.authorization)

        if(userId == id) {
            const existeUsuario = await Usuario.findById(id)
    
            if(!existeUsuario) {
                return res.status(404).json({
                    message: 'Usuario no existente'
                })
            }
    
            const salt = bcrypt.genSaltSync()
            req.body.password = bcrypt.hashSync(req.body.password, salt)
    
            req.body.rol=existeUsuario.rol;
            req.body.activo=existeUsuario.activo;
    
            const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, {new: true})
    
            res.status(201).json({
                message: 'Usuario Actualizado',
                usuario: usuarioActualizado
            })
        } else {
            res.status(403).json({
                message: 'No tiene permiso para actualizar este registro.'
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado',
        })
    }
}

const login = async (req, res) => {
    try {
        const {usuario, password} = req.body

        const existeUsuario = await Usuario.findOne({usuario})
        if(!existeUsuario) {
            return res.status(404).json({
                message: 'Usuario o contraseña incorrecta'
            })
        }

        const passwordDB = bcrypt.compareSync(password, existeUsuario.password)
        if(!passwordDB) {
            return res.status(404).json({
                message: 'Usuario o contraseña incorrecta'
            })
        }

        if(!existeUsuario.activo) {
            return res.status(404).json({
                message: 'Usuario se encuentra inactivo'
            })
        }

        let token = jwt.createToken(existeUsuario)

        res.status(200).json({
            usuario: existeUsuario,
            token
        })

        /* if(req.body.token) {
            res.status(200).json({
                token   
            })
        } else {
            res.status(200).json({
                usuario: existeUsuario,
            })
        } */
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado',
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const {usuario, password} = req.body

        const existeUsuario = await Usuario.findOne({usuario})
        if(!existeUsuario) {
            return res.status(404).json({
                message: 'Usuario o contraseña incorrecta'
            })
        }

        const passwordDB = bcrypt.compare(password, existeUsuario.password)
        if(!passwordDB) {
            console.log(password);
            console.log(existeUsuario.password);
            return res.status(404).json({
                message: 'Usuario o contraseña incorrecta'
            })
        }

        if(!existeUsuario.activo) {
            return res.status(404).json({
                message: 'Usuario se encuentra inactivo'
            })
        }

        let token = jwt.createToken(existeUsuario)

        res.status(200).json({
            usuario: existeUsuario,
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado en refresh token',
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

module.exports = {create, list, login, refreshToken, update}