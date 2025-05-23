import { Router } from "express";
import { ia1, ia2, agregarabdd, limpiarHistorial, traerinfo } from "../controllers/logica.js";
const router = Router();

router.get("/ia1", ia1);
router.get("/ia2", ia2);
router.post("/agregarbasededatos", agregarabdd);
router.delete("/limpiarhistorial", limpiarHistorial);
router.get("/traerinfo", traerinfo);
export default router;