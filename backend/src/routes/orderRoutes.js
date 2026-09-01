import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, orderController.create);
router.get("/me", authMiddleware, orderController.mine);
router.get("/:id", authMiddleware, orderController.getOne);
router.get("/", authMiddleware, adminMiddleware, orderController.all);
router.patch("/:id/status", authMiddleware, adminMiddleware, orderController.updateStatus);

router.post(
    "/:id/avaliacao",
    authMiddleware,
    orderController.avaliar
);

export default router;
