import pool from "../database/database.js";

class OrderModel {

    /* =========================================================
       CRIAR PEDIDO
       ========================================================= */

    async createOrder({
        usuario_id,
        total,
        pagamento,
        endereco,
        itens
    }) {

        const connection =
            await pool.getConnection();

        try {

            await connection.beginTransaction();


            /* ================= CRIAR PEDIDO ================= */

            const [orderResult] =
                await connection.execute(
                    `
                    INSERT INTO pedidos
                    (
                        usuario_id,
                        total,
                        status,
                        pagamento,
                        nome_entrega,
                        telefone,
                        cep,
                        rua,
                        numero,
                        bairro,
                        complemento
                    )
                    VALUES
                    (
                        ?,
                        ?,
                        'recebido',
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )
                    `,
                    [
                        usuario_id,
                        total,
                        pagamento,
                        endereco.nome,
                        endereco.telefone,
                        endereco.cep,
                        endereco.rua,
                        endereco.numero,
                        endereco.bairro,
                        endereco.complemento || null
                    ]
                );


            const pedidoId =
                orderResult.insertId;


            /* ================= ITENS DO PEDIDO ================= */

            for (const item of itens) {

                await connection.execute(
                    `
                    INSERT INTO pedido_itens
                    (
                        pedido_id,
                        produto_id,
                        nome_produto,
                        quantidade,
                        preco_unitario
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        pedidoId,
                        item.produto_id,
                        item.nome,
                        item.quantidade,
                        item.preco_unitario
                    ]
                );

            }


            /* ================= HISTÓRICO INICIAL ================= */

            await connection.execute(
                `
                INSERT INTO pedido_status_historico
                (
                    pedido_id,
                    status
                )
                VALUES (?, 'recebido')
                `,
                [
                    pedidoId
                ]
            );


            await connection.commit();


            return await this.findById(
                pedidoId,
                usuario_id,
                connection
            );


        } catch (error) {

            await connection.rollback();

            throw error;

        } finally {

            connection.release();

        }

    }


    /* =========================================================
       BUSCAR PEDIDO POR ID
       ========================================================= */

    async findById(
        pedidoId,
        usuarioId = null,
        externalConnection = null
    ) {

        const db =
            externalConnection || pool;


        const where =
            usuarioId
                ? `
                  p.pedido_id = ?
                  AND p.usuario_id = ?
                  `
                : `
                  p.pedido_id = ?
                  `;


        const params =
            usuarioId
                ? [
                    pedidoId,
                    usuarioId
                ]
                : [
                    pedidoId
                ];


        const [orders] =
    await db.execute(
        `
        SELECT
            p.*,
            u.nome AS cliente_nome,
            u.email AS cliente_email
        FROM pedidos p
        JOIN usuarios u
            ON u.usuario_id = p.usuario_id
        WHERE ${where}
        LIMIT 1
        `,
        params
    );


        if (!orders.length) {

            return null;

        }


        const [items] =
            await db.execute(
                `
                SELECT
                    produto_id,
                    nome_produto AS nome,
                    quantidade,
                    preco_unitario
                FROM pedido_itens
                WHERE pedido_id = ?
                ORDER BY item_id
                `,
                [
                    pedidoId
                ]
            );


        const historico =
            await this.findHistory(
                pedidoId,
                db
            );


        const p =
            orders[0];


        return this.map(
            p,
            items,
            historico
        );

    }


    /* =========================================================
       PEDIDOS DO CLIENTE
       ========================================================= */

    async findByUser(
        usuarioId
    ) {

        const [orders] =
            await pool.execute(
                `
                SELECT *
                FROM pedidos
                WHERE usuario_id = ?
                ORDER BY criado_em DESC
                `,
                [
                    usuarioId
                ]
            );


        const result =
            [];


        for (const p of orders) {

            const [items] =
                await pool.execute(
                    `
                    SELECT
                        produto_id,
                        nome_produto AS nome,
                        quantidade,
                        preco_unitario
                    FROM pedido_itens
                    WHERE pedido_id = ?
                    ORDER BY item_id
                    `,
                    [
                        p.pedido_id
                    ]
                );


            const historico =
                await this.findHistory(
                    p.pedido_id
                );


            const avaliacao =
    await this.findReviewByOrder(
        p.pedido_id,
        usuarioId
    );


const pedidoFormatado =
    this.map(
        p,
        items,
        historico
    );


pedidoFormatado.avaliado =
    Boolean(avaliacao);


pedidoFormatado.avaliacao =
    avaliacao
        ? {
            avaliacao_id:
                avaliacao.avaliacao_id,

            nota:
                Number(
                    avaliacao.nota
                ),

            comentario:
                avaliacao.comentario,

            origem:
                avaliacao.origem,

            criado_em:
                avaliacao.criado_em
        }
        : null;


result.push(
    pedidoFormatado
);

        }


        return result;

    }


    /* =========================================================
       TODOS OS PEDIDOS - ADMIN
       ========================================================= */

    async findAll() {

        const [orders] =
            await pool.execute(
                `
                SELECT
                    p.*,
                    u.nome AS cliente_nome,
                    u.email AS cliente_email
                FROM pedidos p
                JOIN usuarios u
                    ON u.usuario_id = p.usuario_id
                ORDER BY p.criado_em DESC
                `
            );


        const result =
            [];


        for (const p of orders) {

            const [items] =
                await pool.execute(
                    `
                    SELECT
                        produto_id,
                        nome_produto AS nome,
                        quantidade,
                        preco_unitario
                    FROM pedido_itens
                    WHERE pedido_id = ?
                    ORDER BY item_id
                    `,
                    [
                        p.pedido_id
                    ]
                );


            const historico =
                await this.findHistory(
                    p.pedido_id
                );


            result.push({

                ...this.map(
                    p,
                    items,
                    historico
                ),

                cliente_nome:
                    p.cliente_nome,

                cliente_email:
                    p.cliente_email

            });

        }


        return result;

    }


    /* =========================================================
       HISTÓRICO DO PEDIDO
       ========================================================= */

    async findHistory(
        pedidoId,
        db = pool
    ) {

        const [rows] =
            await db.execute(
                `
                SELECT
                    historico_id,
                    status,
                    criado_em
                FROM pedido_status_historico
                WHERE pedido_id = ?
                ORDER BY criado_em ASC,
                         historico_id ASC
                `,
                [
                    pedidoId
                ]
            );


        return rows;

    }


    /* =========================================================
       ATUALIZAR STATUS
       ========================================================= */

    async updateStatus(
        pedidoId,
        status
    ) {

        const connection =
            await pool.getConnection();


        try {

            await connection.beginTransaction();


            /* ================= STATUS ATUAL ================= */

            const [pedidos] =
                await connection.execute(
                    `
                    SELECT status
                    FROM pedidos
                    WHERE pedido_id = ?
                    `,
                    [
                        pedidoId
                    ]
                );


            if (
                pedidos.length === 0
            ) {

                await connection.rollback();


                return {
                    affectedRows: 0
                };

            }


            const statusAtual =
                pedidos[0].status;


            /* ================= NÃO DUPLICAR STATUS ================= */

            if (
                statusAtual === status
            ) {

                await connection.commit();


                return {
                    affectedRows: 1
                };

            }


            /* ================= ATUALIZAR PEDIDO ================= */

            const [result] =
                await connection.execute(
                    `
                    UPDATE pedidos
                    SET status = ?
                    WHERE pedido_id = ?
                    `,
                    [
                        status,
                        pedidoId
                    ]
                );


            /* ================= SALVAR HISTÓRICO ================= */

            await connection.execute(
                `
                INSERT INTO pedido_status_historico
                (
                    pedido_id,
                    status
                )
                VALUES (?, ?)
                `,
                [
                    pedidoId,
                    status
                ]
            );


            await connection.commit();


            return result;


        } catch (error) {

            await connection.rollback();

            throw error;


        } finally {

            connection.release();

        }

    }

    /* =========================================================
   BUSCAR AVALIAÇÃO DO PEDIDO
   ========================================================= */

async findReviewByOrder(
    pedidoId,
    usuarioId
) {

    const [rows] =
        await pool.execute(
            `
            SELECT
                avaliacao_id,
                pedido_id,
                usuario_id,
                nota,
                comentario,
                origem,
                criado_em
            FROM avaliacoes
            WHERE pedido_id = ?
              AND usuario_id = ?
            LIMIT 1
            `,
            [
                pedidoId,
                usuarioId
            ]
        );

    return rows[0] || null;

}


/* =========================================================
   CRIAR AVALIAÇÃO DO DELIVERY
   ========================================================= */

async createOrderReview({
    pedido_id,
    usuario_id,
    nome_avaliador,
    nota,
    comentario
}) {

    const [result] =
        await pool.execute(
            `
            INSERT INTO avaliacoes
            (
                usuario_id,
                pedido_id,
                produto_id,
                nome_avaliador,
                nota,
                comentario,
                origem
            )
            VALUES
            (
                ?,
                ?,
                NULL,
                ?,
                ?,
                ?,
                'Delivery'
            )
            `,
            [
                usuario_id,
                pedido_id,
                nome_avaliador,
                nota,
                comentario
            ]
        );

    return result;

}

    /* =========================================================
       FORMATAR PEDIDO
       ========================================================= */

    map(
        p,
        items,
        historico = []
    ) {

        return {

    pedido_id:
        p.pedido_id,

    usuario_id:
        p.usuario_id,

    cliente_nome:
        p.cliente_nome || null,

    cliente_email:
        p.cliente_email || null,

    total:
        Number(
            p.total
        ),

            status:
                p.status,

            pagamento:
                p.pagamento,

            criado_em:
                p.criado_em,

            atualizado_em:
                p.atualizado_em,


            endereco: {

                nome:
                    p.nome_entrega,

                telefone:
                    p.telefone,

                cep:
                    p.cep,

                rua:
                    p.rua,

                numero:
                    p.numero,

                bairro:
                    p.bairro,

                complemento:
                    p.complemento || ""

            },


            itens:
                items.map(
                    item => ({

                        ...item,

                        quantidade:
                            Number(
                                item.quantidade
                            ),

                        preco_unitario:
                            Number(
                                item.preco_unitario
                            )

                    })
                ),


            historico:
                historico.map(
                    item => ({

                        historico_id:
                            item.historico_id,

                        status:
                            item.status,

                        criado_em:
                            item.criado_em

                    })
                )

        };

    }

}


export default new OrderModel();