const nJwt = require('njwt')
require('dotenv').config()

const createToken = (usuario) => {
    try {
        const params = {
            sub:usuario.id,
            usuario:usuario.usuario,
            rol:usuario.rol
        }
    
        let jwt= nJwt.create(params, process.env.TOKEN_SECRET || '')
        let time = new Date()
        time.setMinutes(time.getMinutes() + 30); // Sumar 15 minutos
        //time.setHours(time.getHours() + 1)
        jwt.setExpiration(time)
        let token=jwt.compact()
        return token
    } catch (error) {
        console.error(error)
        console.error('Error al crear el token')
    }
}

module.exports = {createToken}