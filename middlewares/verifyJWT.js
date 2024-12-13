const nJwt = require('njwt')
require('dotenv').config()

function verifyAuth(req, res, next) {
    if(!req.headers.authorization) {
        res.status(403).send({message: 'La petición no tiene la cabecera de Autenticación.'})
    }

    const secret = process.env.TOKEN_SECRET || ''
    let token = req.headers.authorization?.split(' ')[1]   //.replace(/['"]+/g, '')
    //console.log(token)
    let payload = nJwt.verify(token, secret, (err, verifiedJwt) => {
        if(err) {
            console.error(err)
            res.status(401).send({message: 'Acceso no autorizado.'})
        } else {
            next()
        }
    })
}

module.exports = { verifyAuth }