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

const verifyUserToken = (token) => {
    try {
        console.log(token)
        const secret = process.env.TOKEN_SECRET || ''
        let split_token = token.split(' ')[1]  

        let payload = nJwt.verify(split_token, secret)   
        return payload.body.sub
    } catch (error) {
        console.error(error)
        console.error('Error al verificar el token')
    }
}

module.exports = {createToken, verifyUserToken}