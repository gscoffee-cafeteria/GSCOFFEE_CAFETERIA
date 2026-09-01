import express from "express";
import multer from "multer";
import path from "path";

import settingsController from "../controllers/settingsController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";


const router = express.Router();


/* =========================================================
   CONFIGURAÇÃO DO UPLOAD
   ========================================================= */

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            "uploads/hero"
        );

    },

    filename: (req, file, cb) => {

        const extensao =
            path.extname(file.originalname);

        const nomeArquivo =
            `hero-${Date.now()}${extensao}`;

        cb(
            null,
            nomeArquivo
        );

    }

});


const upload = multer({

    storage,

    limits: {

        fileSize:
            200 * 1024 * 1024

    },

    fileFilter: (
        req,
        file,
        cb
    ) => {

        const permitido =
            file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/");

        if (!permitido) {

            return cb(
                new Error(
                    "Envie somente arquivos de imagem ou vídeo."
                )
            );

        }

        cb(
            null,
            true
        );

    }

});


// Público — site pode carregar as informações

router.get(

    "/",

    settingsController.get

);


// Upload da mídia do hero

router.post(

    "/hero-upload",

    authMiddleware,

    adminMiddleware,

    upload.single("heroArquivo"),

    settingsController.uploadHero

);


// Protegido — somente administrador pode alterar

router.put(

    "/",

    authMiddleware,

    adminMiddleware,

    settingsController.update

);


export default router;