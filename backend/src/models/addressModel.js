import pool from "../database/database.js";

export async function getAllAddresses() {
    const [rows] = await pool.query(`
        SELECT
            endereco_id,
            nome,
            endereco,
            horario_seg_sab,
            horario_domingo,
            horario_feriado,
            ativo,
            criado_em
        FROM enderecos
        ORDER BY endereco_id DESC
    `);

    return rows;
}


export async function createAddress({
    nome,
    endereco,
    horario_seg_sab,
    horario_domingo,
    horario_feriado,
    ativo = 1
}) {
    const [result] = await pool.query(
        `
        INSERT INTO enderecos
        (
            nome,
            endereco,
            horario_seg_sab,
            horario_domingo,
            horario_feriado,
            ativo
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            nome || null,
            endereco,
            horario_seg_sab || null,
            horario_domingo || null,
            horario_feriado || null,
            ativo
        ]
    );

    return result.insertId;
}


export async function updateAddress(
    endereco_id,
    {
        nome,
        endereco,
        horario_seg_sab,
        horario_domingo,
        horario_feriado,
        ativo
    }
) {
    const [result] = await pool.query(
        `
        UPDATE enderecos
        SET
            nome = ?,
            endereco = ?,
            horario_seg_sab = ?,
            horario_domingo = ?,
            horario_feriado = ?,
            ativo = ?
        WHERE endereco_id = ?
        `,
        [
            nome || null,
            endereco,
            horario_seg_sab || null,
            horario_domingo || null,
            horario_feriado || null,
            ativo,
            endereco_id
        ]
    );

    return result;
}


export async function deleteAddress(endereco_id) {
    const [result] = await pool.query(
        `
        DELETE FROM enderecos
        WHERE endereco_id = ?
        `,
        [endereco_id]
    );

    return result;
}