import pool from "../database/database.js";

export async function getAllContacts() {
    const [rows] = await pool.query(
        `
        SELECT
            contato_id,
            tipo,
            nome,
            valor,
            ativo,
            criado_em
        FROM contatos
        ORDER BY contato_id DESC
        `
    );

    return rows;
}


export async function createContact({
    tipo,
    nome,
    valor,
    ativo = 1
}) {
    const [result] = await pool.query(
        `
        INSERT INTO contatos
        (tipo, nome, valor, ativo)
        VALUES (?, ?, ?, ?)
        `,
        [
            tipo,
            nome || null,
            valor,
            ativo
        ]
    );

    return result.insertId;
}


export async function updateContact(
    contato_id,
    {
        tipo,
        nome,
        valor,
        ativo
    }
) {
    const [result] = await pool.query(
        `
        UPDATE contatos
        SET
            tipo = ?,
            nome = ?,
            valor = ?,
            ativo = ?
        WHERE contato_id = ?
        `,
        [
            tipo,
            nome || null,
            valor,
            ativo,
            contato_id
        ]
    );

    return result;
}


export async function deleteContact(contato_id) {
    const [result] = await pool.query(
        `
        DELETE FROM contatos
        WHERE contato_id = ?
        `,
        [contato_id]
    );

    return result;
}