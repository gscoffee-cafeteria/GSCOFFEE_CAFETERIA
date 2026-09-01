import dotenv from "dotenv";
import app from "./src/app.js";
import pool from "./src/database/database.js";
import { ensureOrderTables } from "./src/database/initDatabase.js";

dotenv.config();
const PORT = process.env.PORT || 5008;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("Banco conectado com sucesso!");
        connection.release();
        await ensureOrderTables();
        console.log("Tabelas de pedidos verificadas!");
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    } catch (error) {
        console.error("Erro ao conectar/inicializar banco:");
        console.error(error);
    }
}
startServer();
