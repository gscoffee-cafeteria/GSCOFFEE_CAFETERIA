import express from "express";
import multer from "multer";
import path from "path";

import productController from "../controllers/productController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";


const router = express.Router();


/* =========================================================
   CONFIGURAÇÃO DO UPLOAD DE IMAGEM
   ========================================================= */

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            "uploads/produtos"
        );

    },


    filename: (req, file, cb) => {

        const extensao =
            path.extname(
                file.originalname
            );


        const nomeArquivo =
            `produto-${Date.now()}${extensao}`;


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
            10 * 1024 * 1024

    },


    fileFilter: (
        req,
        file,
        cb
    ) => {

        const permitido =
            file.mimetype.startsWith(
                "image/"
            );


        if (!permitido) {

            return cb(
                new Error(
                    "Envie somente arquivos de imagem."
                )
            );

        }


        cb(
            null,
            true
        );

    }

});


// Público — cliente pode visualizar

router.get(
    "/",
    productController.getAll
);


router.get(
    "/:id",
    productController.getById
);


// Upload da imagem do produto

router.post(

    "/upload-imagem",

    authMiddleware,

    adminMiddleware,

    upload.single("imagemArquivo"),

    productController.uploadImage

);


// Protegido — somente administrador

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    productController.create

);


router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    productController.update

);


router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    productController.delete

);


export default router;