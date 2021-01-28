import User from "../models/User";
import Role from '../models/Role';
import Grado from '../models/Grado';
import Materia from "../models/Materia";


// CRUD PARA USUARIOS

export const createUser = async(req, res) => {
    const { identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles } = req.body;
    const newUser = new User({ identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password: await User.encryptPassword(password), roles });
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: "estudiante" })
        newUser.roles = [role._id]
    }
    const userSaved = await newUser.save()
    res.status(201).json(userSaved);
}

export const getUsers = async(req, res) => {
    const infoUsuario = await User.find().populate("roles");
    res.status(200).json(infoUsuario)
}

export const getUserById = async(req, res) => {
    const user = await User.findById(req.params.userId).populate("roles");
    console.log(user)
    res.status(200).json(user);
}

export const updateUserById = async(req, res) => {
    const {
        identificacion,
        email,
        nombres,
        apellidos,
        telefono,
        rh,
        fechaNacimiento,
        direccion,
        password,
        roles
    } = req.body;

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        const r = foundRoles.map(role => role._id)
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            identificacion,
            email,
            nombres,
            apellidos,
            telefono,
            rh,
            fechaNacimiento,
            direccion,
            password: await User.encryptPassword(password),
            roles: r
        }, { new: true }).populate("roles");
        res.status(200).json(updateUser);
    } else {
        const role = await Role.findOne({ name: 'estudiante' })
        const r = [role._id]
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            identificacion,
            email,
            nombres,
            apellidos,
            telefono,
            rh,
            fechaNacimiento,
            direccion,
            password: await User.encryptPassword(password),
            roles: r
        }, { new: true }).populate("roles");
        res.status(200).json(updateUser);

    }
}
export const deleteUserById = async(req, res) => {
    const { userId } = req.params
    await User.findByIdAndDelete(userId)
    res.status(204).json()

}



// CRUD Materias
export const createMatter = async(req, res) => {
    const { nombre_materia, nota } = req.body;
    const result = await Materia({ nombre_materia });
    result.save();
    res.status(200).json(result);
}



export const getMatter = async(req, res) => {
    const getMatter = await Materia.find()
    res.status(200).json(getMatter);
}

export const getMatterId = async(req, res) => {
    const metter = await Materia.findById(req.params.matterId);
    console.log(metter)
    res.status(200).json(metter);
}

export const updateMatterId = async(req, res) => {
    const metter = await Materia.findByIdAndUpdate(req.params.matterId, req.body, { new: true });
    res.status(200).json(metter)
}

export const deleteMatterId = async(req, res) => {
    await Materia.findByIdAndDelete(req.params.matterId);
    res.status(200).json("Eliminado")
}



// CRUD crear grado

export const createGrade = async(req, res) => {
    const { numero_grado, materia } = req.body;
    const grado = new Grado({ numero_grado, materia });

    if (materia) {

        const foundMateria = await Materia.find({ nombre_materia: { $in: materia } })
        grado.materia = foundMateria.map(materia => materia._id)
    } else {
        const materia = await Materia.findOne({ nombre_materia: 'Sociales' })
        grado.materia = [materia._id]


    }
    const result = await grado.save();
    res.status(200).json(result);
}


export const getGrade = async(req, res) => {
    const foundGrade = await Grado.find()
    res.status(200).json(foundGrade)

}


export const deleteGradeId = async(req, res) => {
    const foundDeleteGrade = await Grado.findByIdAndDelete(req.params.GradeId)
    res.status(400).json("Eliminado")
}

export const updateGradeId = async(req, res) => {

    const { numero_grado, materia } = req.body;

    if (materia) {
        const grado = new Grado({ numero_grado, materia });
        const foundMateria = await Materia.find({ nombre_materia: { $in: materia } })
        const metter = foundMateria.map(materia => materia._id)
        console.log(metter, req.body)
        const updateGrade = await Grado.findByIdAndUpdate(req.params.GradeId, {
            numero_grado,
            materia: metter
        }, { new: true });
        res.status(200).json(updateGrade);
    } else {
        const grado = new Grado({ numero_grado, materia });
        const materia = await Materia.findOne({ nombre_materia: 'Sociales' })
        const matter = [materia._id]
        const updateGrade = await Grado.findByIdAndUpdate(req.params.GradeId, {
            numero_grado,
            materia: matter
        }, { new: true });
        res.status(200).json(updateGrade);
    }
}


export const getGradeId = async(req, res) => {
    const foundGradeId = await Grado.findById(req.params.GradeId);
    res.status(200).json(foundGradeId);
}