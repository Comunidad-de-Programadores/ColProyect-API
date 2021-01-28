import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/inialSetup";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import docenteRoutes from "./routes/docente.routes";
import actividadRoutes from "./routes/actividad.routes";
import notaRoutes from "./routes/nota.routes";
import estudianteRoutes from "./routes/estudiantes.routes";





const app = express()
createRoles();
global.__basedir = __dirname;

app.set('pkg', pkg);
app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        nombreproyecto: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})



app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/docente', docenteRoutes);
app.use('/api/actividad', actividadRoutes);
app.use('/api/nota', notaRoutes);
app.use('/api/estudiante', estudianteRoutes);


export default app;