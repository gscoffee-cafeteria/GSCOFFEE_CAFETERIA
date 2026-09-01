import { Router } from "express";

import categoryController from "../controllers/categoryController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";


const router = Router();


// Público
router.get("/", categoryController.getAll);

router.get("/:id", categoryController.getById);


// Somente administrador
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    categoryController.create
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    categoryController.update
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    categoryController.delete
);


export default router;