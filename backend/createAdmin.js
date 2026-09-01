import bcrypt from "bcrypt";
import pool from "./src/database/database.js";

const nome = "Administrador";
const email = "admin@gscoffee.com";
const senha = "123456";
const telefone = "(11) 99999-9999";
const role = "admin";

try {

    const senhaHash = await bcrypt.hash(senha, 10);

    const query = `
        INSERT INTO usuarios
        (
            nome,
            email,
            senha,
            telefone,
            role
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    await pool.execute(query, [
        nome,
        email,
        senhaHash,
        telefone,
        role
    ]);

    console.log("Administrador criado com sucesso!");
    console.log("Email:", email);
    console.log("Senha:", senha);

} catch (error) {

    console.error("Erro ao criar administrador:", error);

} finally {

    await pool.end();

}