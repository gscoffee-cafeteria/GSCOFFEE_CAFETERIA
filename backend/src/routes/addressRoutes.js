import express from "express";

import {
    listarEnderecos,
    cadastrarEndereco,
    editarEndereco,
    removerEndereco
} from "../controllers/addressController.js";

import authMiddleware
    from "../middlewares/authMiddleware.js";

import adminMiddleware
    from "../middlewares/adminMiddleware.js";


const router =
    express.Router();


router.get(
    "/",
    listarEnderecos
);


router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    cadastrarEndereco
);


router.put(
    "/:endereco_id",
    authMiddleware,
    adminMiddleware,
    editarEndereco
);


router.delete(
    "/:endereco_id",
    authMiddleware,
    adminMiddleware,
    removerEndereco
);


export default router;