import pool from "../database/database.js";


class UserModel {


    async findByLogin(login) {

        const query = `
            SELECT *
            FROM usuarios
            WHERE email = ? OR nome = ?
            LIMIT 1
        `;

        const [rows] =
            await pool.execute(
                query,
                [login, login]
            );

        return rows[0];
    }


    async findByEmail(email) {

        const query = `
            SELECT *
            FROM usuarios
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] =
            await pool.execute(
                query,
                [email]
            );

        return rows[0];
    }


    async findById(id) {

        const query = `
            SELECT
                usuario_id,
                nome,
                email,
                telefone,
                cpf,
                data_nascimento,
                role,
                criado_em
            FROM usuarios
            WHERE usuario_id = ?
            LIMIT 1
        `;

        const [rows] =
            await pool.execute(
                query,
                [id]
            );

        return rows[0];
    }


    async createUser(
        nome,
        email,
        senha,
        telefone,
        role = "cliente"
    ) {

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

        const [result] =
            await pool.execute(
                query,
                [
                    nome,
                    email,
                    senha,
                    telefone,
                    role
                ]
            );

        return result;
    }


    async updateProfile(
        id,
        nome,
        email,
        telefone,
        cpf,
        data_nascimento
    ) {

        const query = `
            UPDATE usuarios
            SET
                nome = ?,
                email = ?,
                telefone = ?,
                cpf = ?,
                data_nascimento = ?
            WHERE usuario_id = ?
        `;

        const [result] =
            await pool.execute(
                query,
                [
                    nome,
                    email,
                    telefone,
                    cpf || null,
                    data_nascimento || null,
                    id
                ]
            );

        return result;
    }


    async updatePassword(
        id,
        novaSenha
    ) {

        const query = `
            UPDATE usuarios
            SET senha = ?
            WHERE usuario_id = ?
        `;

        const [result] =
            await pool.execute(
                query,
                [
                    novaSenha,
                    id
                ]
            );

        return result;
    }


    /* =========================================================
       RECUPERAÇÃO DE SENHA
       ========================================================= */


    async createRecoveryCode(
        usuario_id,
        codigo,
        expiracao
    ) {

        /*
          Antes de criar um novo código,
          invalida códigos anteriores ainda abertos.
        */

        const invalidarAntigos = `
            UPDATE recuperacao_senha
            SET usado = 1
            WHERE usuario_id = ?
              AND usado = 0
        `;

        await pool.execute(
            invalidarAntigos,
            [usuario_id]
        );


        const query = `
            INSERT INTO recuperacao_senha
            (
                usuario_id,
                codigo,
                expiracao,
                usado
            )
            VALUES (?, ?, ?, 0)
        `;

        const [result] =
            await pool.execute(
                query,
                [
                    usuario_id,
                    codigo,
                    expiracao
                ]
            );

        return result;
    }


    async findValidRecoveryCode(
        usuario_id,
        codigo
    ) {

        const query = `
            SELECT *
            FROM recuperacao_senha
            WHERE usuario_id = ?
              AND codigo = ?
              AND usado = 0
              AND expiracao > NOW()
            ORDER BY id DESC
            LIMIT 1
        `;

        const [rows] =
            await pool.execute(
                query,
                [
                    usuario_id,
                    codigo
                ]
            );

        return rows[0];
    }


    async markRecoveryCodeAsUsed(
        id
    ) {

        const query = `
            UPDATE recuperacao_senha
            SET usado = 1
            WHERE id = ?
        `;

        const [result] =
            await pool.execute(
                query,
                [id]
            );

        return result;
    }


    async resetPassword(
        usuario_id,
        novaSenhaHash
    ) {

        const query = `
            UPDATE usuarios
            SET senha = ?
            WHERE usuario_id = ?
        `;

        const [result] =
            await pool.execute(
                query,
                [
                    novaSenhaHash,
                    usuario_id
                ]
            );

        return result;
    }

}


export default new UserModel();