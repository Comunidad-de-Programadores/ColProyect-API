import { Router } from "express";
const router = Router();


import * as estudiantesCtrl from "../controllers/estudiantes.controller";


router.get('/:idUser&:idMatter', estudiantesCtrl.getActivityByIdUser)
router.get('/', estudiantesCtrl.getActivitys)
router.post('/:idUser&:idGrade&:idMatter', estudiantesCtrl.uploadActivity)


export default router;