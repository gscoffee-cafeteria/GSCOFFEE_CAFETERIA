import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import userAddressRoutes from "./routes/userAddressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();


const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);


/* =========================================================
   ARQUIVOS DE UPLOAD
   ========================================================= */

app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "../uploads"
        )
    )
);


app.use(cors({

    origin: true,

    credentials: true

}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/categorias", categoryRoutes);
app.use("/produtos", productRoutes);
app.use("/pedidos", orderRoutes);
app.use("/configuracoes", settingsRoutes);
app.use("/contatos", contactRoutes);
app.use("/enderecos", addressRoutes);
app.use("/enderecos-usuario", userAddressRoutes);
app.use("/avaliacoes", reviewRoutes);

app.get("/", (req, res) => {

    res.json({

        message:
            "API Cafeteria Online funcionando!"

    });

});


export default app;