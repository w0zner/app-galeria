const Fotografias = require('../models/fotografia')
const mongoose = require('mongoose');
const thumb= require('node-thumbnail').thumb;
const path = require('path')
const jwt = require('../utils/jwt')
const fs= require('fs')
const os = require('os');

const create = async (req, res) => {
    try {
        const userId = jwt.verifyUserToken(req.headers.authorization)
        const foto = new Fotografias(req.body)

        foto.usuario_creacion = userId
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
                message: 'No existe el registro buscado'
            })
        }
         console.log(req.body?.nombre)
        if(existeFoto.nombre != req.body?.nombre) {
            console.log(12)
            const existeNombre = await Fotografias.exists({ nombre });
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
        console.error(error?.code)
        if(error?.code==11000)
            res.status(400).json({
                message: 'Registro con campo ya existente'
            })
        else
            res.status(500).json({
                message: 'Error inesperado'
            })
    }
}

const uploadFotografia = async (req, res) => {
    try {
        const id= req.params.id

        if(req.files) {
            const file_path=req.files.foto.path
            console.log(req.files)

            let file_split = ''
            if(os.platform() == 'linux') {
                file_split = file_path.split('/');
            } else {
                file_split = file_path.split('\\')
            }


            console.log("11"+file_split);
            const file_name = file_split[2]
            console.log(file_name)
            const ext_split= file_name.split('\.')
            const file_ext= ext_split[1]
            console.log(file_ext)
            if(file_ext=='jpg' || file_ext=='jpeg'){
                let fotografia={}
                const objetoBD = await Fotografias.findById(id)
                if(!objetoBD) {
                    fs.unlink(file_path, (err)=> {
                        if(err) {
                            res.status(500).json({
                                message: 'Error al tratar el archivo'
                            })
                        }
                    })
                    return res.status(404).json({
                        message: 'No existe el registro con el id buscado'
                    })
                }
                fotografia.imagen=file_name
          
                const fotoActualizada = await Fotografias.findByIdAndUpdate(id, fotografia, {new: true})

                const new_path = './uploads/fotografias/' + file_name
                const thumb_path = './uploads/fotografias/thumbs'

                thumb({
                    source: path.resolve(new_path),
                    destination: path.resolve(thumb_path),
                    width: 200,
                    suffix: '',
                    ignore: false
                }).then(()=>{
                    res.status(200).json({
                        message: 'Archivo subido',
                        fotoActualizada
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        message: 'Error al crear el thumbnail'
                    })
                })
            } else {
                fs.unlink(file_path, (err)=> {
                    if(err) {
                        res.status(500).json({
                            message: 'Error al tratar el archivo'
                        })
                    }
                })
                return res.status(400).json({
                    message: 'Solo se permite archivos JPG'
                })
            }
        } else {
            return res.status(400).json({
                message: 'No hay ningún archivo para subir'
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const getFotografia = (req, res) => {
    try {
        const fotografia = req.params.fotografia
        const thumb= req.params.thumb
        let path_foto=null
        if(!thumb)
            path_foto='./uploads/fotografias/' + fotografia
        else
            path_foto='./uploads/fotografias/thumbs/' + fotografia

        fs.exists(path_foto, (exists)=>{
            if(exists){
                res.sendFile(path.resolve(path_foto))
            }else{
                res.status(500).json({
                    message: 'No se encuentra la fotografía'
                })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const getAll = async (req, res) => {
    try {
        const fotografias = await Fotografias.find({activo: true}, 'nombre descripcion imagen numero autor activo usuario_creacion createdAt updatedAt').sort({numero: 1})
        console.log(fotografias)
        res.status(200).send({
            fotografias
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const getAllAdmin = async (req, res) => {
    try {
        const fotografias = await Fotografias.find({}, 'nombre descripcion imagen numero autor activo usuario_creacion createdAt updatedAt').sort({numero: 1})

        res.status(200).send({
            fotografias
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'ID del registro inválido' });
        }

        const fotografia = await Fotografias.findById(id)

        if(!fotografia) {
            return res.status(404).json({message: 'No existe el registro buscado'})
        }

        res.status(200).send({fotografia})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error inesperado'
        })
    }
}

module.exports = {create, update, uploadFotografia, getFotografia,getAll, getAllAdmin, getById}