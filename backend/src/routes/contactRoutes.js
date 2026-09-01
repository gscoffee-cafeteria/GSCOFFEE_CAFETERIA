import express from "express";

import {
    listarContatos,
    cadastrarContato,
    editarContato,
    removerContato
} from "../controllers/contactController.js";

import authMiddleware
    from "../middlewares/authMiddleware.js";

import adminMiddleware
    from "../middlewares/adminMiddleware.js";


const router =
    express.Router();


router.get(
    "/",
    listarContatos
);


router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    cadastrarContato
);


router.put(
    "/:contato_id",
    authMiddleware,
    adminMiddleware,
    editarContato
);


router.delete(
    "/:contato_id",
    authMiddleware,
    adminMiddleware,
    removerContato
);


export default router;