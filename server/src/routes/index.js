import { Router } from "express";
import {
  getWeatherByCity,
  getWeatherByZip,
  getWeatherByCoordinates,
} from "./weatherRoutes.js";

const router = Router();

router.get('/city', getWeatherByCity);
router.get('/zip', getWeatherByZip);
router.get('/coordinates', getWeatherByCoordinates);

export default router;
