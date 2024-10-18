import express from "express";
import {
    getAllCars,
    getCarById,
    createCar,
} from "../controllers/carController.js";

const router = express.Router();

/**
 * 1. Get all cars => GET /cars
 * 2. Get single car by id => GET /cars/:id
 * 3. Create a car => POST /cars
 * 4. Update car by id => PUT /cars/:id
 * 5. Delete car by id => DELETE /cars/:id
 */

router.get("/cars", getAllCars);
router.get("/cars/:id", getCarById);
router.post("/cars", createCar);
router.put("/cars/:id");
router.delete("/cars/:id");

export default router;
