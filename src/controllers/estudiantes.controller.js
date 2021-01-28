// import Desarrollo from "../models/Desarrollo"
import Materia from "../models/Materia"
import Grado from "../models/Grado"
import User from "../models/User"
import { mongo } from 'mongoose'
import Desarrollo from "../models/Desarrollo";
import uploadFile from "../middlewares/upload";
const fs = require('fs');

export const uploadActivity = async(req, res) => {
    try {
        const { idUser, idGrade, idMatter } = req.params
        const directoryPath = __basedir + `../../resources/static/assets/uploads/${req.params.idUser}/${req.params.idGrade}/${req.params.idMatter}/`;
        fs.mkdir(__basedir + `../../resources/static/assets/uploads/${req.params.idUser}/`, function(e) { if (!e || (e && e.code === 'EEXIST')) {} else {} });
        fs.mkdir(__basedir + `../../resources/static/assets/uploads/${req.params.idUser}/${req.params.idGrade}/`, function(e) { if (!e || (e && e.code === 'EEXIST')) {} else {} });
        fs.mkdir(__basedir + `../../resources/static/assets/uploads/${req.params.idUser}/${req.params.idGrade}/${req.params.idMatter}/`, function(e) { if (!e || (e && e.code === 'EEXIST')) {} else {} });
        await uploadFile(req, res)
        const { titulo, descripcion, urlArchivo, materia, user, grado } = req.body
        const respuesta = await Desarrollo({
            titulo,
            descripcion,
            urlArchivo,
            materia,
            user,
            grado
        })

        if (req.params.idUser && req.params.idGrade && req.params.idMatter) {
            console.log("Estoy aquí")
            const foundMateria = await Materia.find({ _id: { $in: req.params.idMatter } })
            respuesta.materia = foundMateria.map(materia => materia._id)
            const foundGrado = await Grado.find({ _id: { $in: req.params.idGrade } })
            respuesta.grado = foundGrado.map(grado => grado._id)
            const foundUser = await User.find({ _id: { $in: req.params.idUser } })
            respuesta.user = foundUser.map(user => user._id)
        } else {
            console.log("Prueba de salida ")
            res.status(400).json("Materia o Grado no existe");
        }
        respuesta.urlArchivo = req.file.path
        respuesta.save()

        res.json("Respuesta")
    } catch (error) {
        console.log(error)
    }

}


export const getActivitys = async(req, res) => {
    const result = await Desarrollo.find()
    res.status(200).json(result)

}
export const getActivityByIdUser = async(req, res) => {
    try {
        console.log(req.params.idUser + " Use")
        const result = await Desarrollo.find({ "user": mongo.ObjectId(req.params.idUser), "materia": mongo.ObjectId(req.params.idMatter) })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}