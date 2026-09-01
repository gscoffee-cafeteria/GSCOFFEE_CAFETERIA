import { Router } from "express";

import authController from "../controllers/authController.js";

import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();


/* =========================================================
   LOGIN / CADASTRO
   ========================================================= */

router.post(
    "/login",
    authController.login
);


router.post(
    "/register",
    authController.register
);


/* =========================================================
   RECUPERAÇÃO DE SENHA
   ========================================================= */

/*
    Solicita um código de recuperação.

    Não precisa de token porque o usuário
    esqueceu a senha e não está logado.
*/

router.post(
    "/forgot-password",
    authController.forgotPassword
);


/*
    Valida o código recebido e
    redefine a senha.

    Também não precisa de token.
*/

router.post(
    "/reset-password",
    authController.resetPassword
);


/* =========================================================
   PERFIL DO CLIENTE
   ========================================================= */

router.get(
    "/me",
    authMiddleware,
    authController.me
);


router.put(
    "/me",
    authMiddleware,
    authController.updateMe
);


router.put(
    "/change-password",
    authMiddleware,
    authController.changePassword
);


export default router;