import pool from "../database/database.js";

export async function getUserAddresses(usuario_id) {
    const [rows] = await pool.query(
        `
        SELECT
            endereco_id,
            usuario_id,
            apelido,
            cep,
            rua,
            numero,
            bairro,
            complemento,
            criado_em
        FROM enderecos_usuario
        WHERE usuario_id = ?
        ORDER BY endereco_id DESC
        `,
        [usuario_id]
    );

    return rows;
}


export async function createUserAddress(
    usuario_id,
    {
        apelido,
        cep,
        rua,
        numero,
        bairro,
        complemento
    }
) {
    const [result] = await pool.query(
        `
        INSERT INTO enderecos_usuario
        (
            usuario_id,
            apelido,
            cep,
            rua,
            numero,
            bairro,
            complemento
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            usuario_id,
            apelido,
            cep,
            rua,
            numero,
            bairro,
            complemento || null
        ]
    );

    return result.insertId;
}


export async function updateUserAddress(
    usuario_id,
    endereco_id,
    {
        apelido,
        cep,
        rua,
        numero,
        bairro,
        complemento
    }
) {
    const [result] = await pool.query(
        `
        UPDATE enderecos_usuario
        SET
            apelido = ?,
            cep = ?,
            rua = ?,
            numero = ?,
            bairro = ?,
            complemento = ?
        WHERE endereco_id = ?
        AND usuario_id = ?
        `,
        [
            apelido,
            cep,
            rua,
            numero,
            bairro,
            complemento || null,
            endereco_id,
            usuario_id
        ]
    );

    return result;
}


export async function deleteUserAddress(
    usuario_id,
    endereco_id
) {
    const [result] = await pool.query(
        `
        DELETE FROM enderecos_usuario
        WHERE endereco_id = ?
        AND usuario_id = ?
        `,
        [
            endereco_id,
            usuario_id
        ]
    );

    return result;
}