import pool from "../database/database.js";


const ReviewModel = {

    async getPublicReviews() {

        const [rows] = await pool.execute(`
  SELECT
    avaliacao_id,
    nome_avaliador,
    nota,
    comentario,
    origem,
    publicada,
    criado_em
  FROM avaliacoes
  WHERE comentario IS NOT NULL
    AND publicada = 1
  ORDER BY criado_em DESC
`);

        return rows;

    },

    async getAdminReviews() {

    const [rows] = await pool.execute(`
        SELECT
            avaliacao_id,
            usuario_id,
            pedido_id,
            nome_avaliador,
            nota,
            comentario,
            origem,
            publicada,
            criado_em
        FROM avaliacoes
        ORDER BY criado_em DESC
    `);

    return rows;

},

    async createReview(dados) {

    const {
        nome_avaliador,
        nota,
        comentario,
        origem
    } = dados;

    const [result] = await pool.execute(
        `
        INSERT INTO avaliacoes
        (
            usuario_id,
            produto_id,
            nome_avaliador,
            nota,
            comentario,
            origem
        )
        VALUES
        (
            NULL,
            NULL,
            ?,
            ?,
            ?,
            ?
        )
        `,
        [
            nome_avaliador,
            nota,
            comentario,
            origem
        ]
    );

    return result;
},

    async updateReview(id, dados) {

    const {
        nome_avaliador,
        nota,
        comentario,
        origem
    } = dados;

    const [result] =
        await pool.execute(
            `
            UPDATE avaliacoes
            SET
                nome_avaliador = ?,
                nota = ?,
                comentario = ?,
                origem = ?
            WHERE avaliacao_id = ?
            `,
            [
                nome_avaliador,
                nota,
                comentario,
                origem,
                id
            ]
        );

    return result;
},

async updatePublishedStatus(id, publicada) {

    const [result] =
        await pool.execute(
            `
            UPDATE avaliacoes
            SET publicada = ?
            WHERE avaliacao_id = ?
            `,
            [
                publicada,
                id
            ]
        );

    return result;

},

async deleteReview(id) {

    const [result] =
        await pool.execute(
            `
            DELETE FROM avaliacoes
            WHERE avaliacao_id = ?
            `,
            [id]
        );

    return result;
}

};


export default ReviewModel;