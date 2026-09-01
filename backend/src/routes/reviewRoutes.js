import express from "express";

import ReviewController from "../controllers/reviewController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";


const router = express.Router();


/* =========================================================
   AVALIAÇÕES PÚBLICAS
   Somente avaliações publicadas
   ========================================================= */

router.get(
    "/",
    ReviewController.getPublicReviews
);


/* =========================================================
   AVALIAÇÕES DO ADMIN
   Todas: publicadas e ocultas
   ========================================================= */

router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    ReviewController.getAdminReviews
);


/* =========================================================
   CADASTRAR
   ========================================================= */

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    ReviewController.createReview
);


/* =========================================================
PUBLICAR / OCULTAR NO SITE
========================================================= */

router.patch(
    "/:id/publicada",
    authMiddleware,
    adminMiddleware,
    ReviewController.updatePublishedStatus
);


/* =========================================================
   EDITAR
   ========================================================= */

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    ReviewController.updateReview
);

/* =========================================================
   EXCLUIR
   ========================================================= */

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    ReviewController.deleteReview
);


export default router;