const nJwt = require('njwt')
require('dotenv').config()

function verifyAuth(req, res, next) {
    if(!req.headers.authorization) {
        res.status(403).send({message: 'La petición no tiene la cabecera de Autenticación.'})
    }

    const secret = process.env.TOKEN_SECRET || ''
    let token = req.headers.authorization?.split(' ')[1] 

    let payload = nJwt.verify(token, secret, (err, verifiedJwt) => {
        if(err) {
            if (err.message.includes('expired')) {
                console.error(err)
                res.status(401).send({message: 'El token ha expirado.'});
            } else {
                console.error(err)
                res.status(401).send({message: 'Acceso no autorizado.'})
            }
        } else {
            console.log(verifiedJwt.body)
            next()
        }
    })
}

module.exports = { verifyAuth }