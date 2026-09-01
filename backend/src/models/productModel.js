import pool from "../database/database.js";


class ProductModel {


    async getAllProducts() {

        const query = `
            SELECT 
                p.*,
                c.nome AS categoria_nome
            FROM produtos p
            INNER JOIN categorias c
                ON p.categoria_id = c.categoria_id
            ORDER BY
                CASE c.nome
                    WHEN 'Cafés' THEN 1
                    WHEN 'Chás' THEN 2
                    WHEN 'Doces' THEN 3
                    WHEN 'Salgados' THEN 4
                    WHEN 'Shakes' THEN 5
                    WHEN 'Smoothies' THEN 6
                    WHEN 'Refrigerantes e Águas' THEN 7
                    ELSE 99
                END,
                p.nome ASC
        `;
    
        const [rows] =
            await pool.execute(query);
    
        return rows;
    }



    async createProduct(
        nome,
        descricao,
        preco,
        estoque,
        imagem,
        categoria_id,
        disponivel,
        retirada,
        balcao,
        mais_pedido
    ) {

        const query = `
            INSERT INTO produtos
            (
                nome,
                descricao,
                preco,
                estoque,
                imagem,
                categoria_id,
                disponivel,
                retirada,
                balcao,
                mais_pedido
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;


        const [result] =
            await pool.execute(query, [

                nome,
                descricao,
                preco,
                estoque,
                imagem,
                categoria_id,
                disponivel,
                retirada,
                balcao,
                mais_pedido || 0

            ]);


        return result;
    }



    async updateProduct(
        id,
        nome,
        descricao,
        preco,
        estoque,
        imagem,
        categoria_id,
        disponivel,
        retirada,
        balcao,
        mais_pedido
    ) {

        const query = `
            UPDATE produtos
            SET

                nome = ?,
                descricao = ?,
                preco = ?,
                estoque = ?,
                imagem = ?,
                categoria_id = ?,
                disponivel = ?,
                retirada = ?,
                balcao = ?,
                mais_pedido = ?

            WHERE produto_id = ?
        `;


        const [result] =
            await pool.execute(query, [

                nome,
                descricao,
                preco,
                estoque,
                imagem,
                categoria_id,
                disponivel,
                retirada,
                balcao,
                mais_pedido || 0,
                id

            ]);


        return result;
    }



    async getProductById(id) {

        const query = `
            SELECT *
            FROM produtos
            WHERE produto_id = ?
        `;


        const [rows] =
            await pool.execute(query, [id]);


        return rows;
    }



    async deleteProduct(id) {

    // Desvincula o produto dos pedidos antigos
    await pool.execute(
        `
        UPDATE pedido_itens
        SET produto_id = NULL
        WHERE produto_id = ?
        `,
        [id]
    );


    // Exclui definitivamente o produto
    const [result] =
        await pool.execute(
            `
            DELETE FROM produtos
            WHERE produto_id = ?
            `,
            [id]
        );


        return result;
}

}


export default new ProductModel();