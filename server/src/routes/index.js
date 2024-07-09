import { Router } from "express";
import { getWeatherByCoords, getWeatherByZip } from "./weatherRoutes.js";
import { getAllCitiesByName } from "./searchRoutes.js";

const router = Router();

router.get("/search", getAllCitiesByName);
router.get("/coords", getWeatherByCoords);
router.get("/zip", getWeatherByZip);

export default router;
