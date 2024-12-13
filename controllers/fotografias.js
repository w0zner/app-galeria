const Fotografias = require('../models/fotografia')

const create = async (req, res) => {
    try {
        const foto = new Fotografias(req.body)
        await foto.save()

        res.status(201).json({
            message: 'Registro guardado',
            foto
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id
        const existeFoto = await Fotografias.findById(id)

        if(!existeFoto) {
            return res.status(404).json({
                message: 'No existe el usuario buscado'
            })
        }

        if(existeFoto.nombre != req.body?.nombre) {
            const existeNombre = await Fotografias.findOne({nombre})
            if(existeNombre) {
                return res.status(400).json({
                    message: 'Ya existe un registro con ese nombre'
                })
            }
        }

        const fotoActualizada = await Fotografias.findByIdAndUpdate(id, req.body, {new: true})

        res.status(201).json({
            message: 'Registro Actualizado',
            foto: fotoActualizada
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

module.exports = {create, update}