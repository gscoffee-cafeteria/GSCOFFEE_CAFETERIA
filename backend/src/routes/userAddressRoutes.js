import express from "express";

import {
    listUserAddresses,
    createAddress,
    editAddress,
    removeAddress
} from "../controllers/userAddressController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get(
    "/",
    authMiddleware,
    listUserAddresses
);


router.post(
    "/",
    authMiddleware,
    createAddress
);


router.put(
    "/:id",
    authMiddleware,
    editAddress
);


router.delete(
    "/:id",
    authMiddleware,
    removeAddress
);


export default router;