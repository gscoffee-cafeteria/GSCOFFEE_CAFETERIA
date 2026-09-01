import productModel from "../models/productModel.js";


class ProductController {

    async getAll(req, res) {

        try {

            const products =
                await productModel.getAllProducts();

            return res.status(200).json(products);

        } catch (error) {

            console.error("Erro ao buscar produtos:", error);

            return res.status(500).json({
                message: "Erro ao buscar produtos"
            });
        }
    }


    async create(req, res) {

        try {

            const {
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
            } = req.body;


            const result =
                await productModel.createProduct(
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
                );


            return res.status(201).json({
                message: "Produto criado com sucesso",
                id: result.insertId
            });

        } catch (error) {

            console.error("Erro ao criar produto:", error);

            return res.status(500).json({
                message: "Erro ao criar produto"
            });
        }
    }


    async update(req, res) {

        try {

            const { id } = req.params;


            const {
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
            } = req.body;


            const result =
                await productModel.updateProduct(
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
                );


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }


            return res.status(200).json({
                message: "Produto atualizado com sucesso"
            });

        } catch (error) {

            console.error("Erro ao atualizar produto:", error);

            return res.status(500).json({
                message: "Erro ao atualizar produto"
            });
        }
    }


    async getById(req, res) {

        try {

            const { id } = req.params;


            const product =
                await productModel.getProductById(id);


            if (!product.length) {

                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }


            return res.status(200).json(product[0]);

        } catch (error) {

            console.error("Erro ao buscar produto:", error);

            return res.status(500).json({
                message: "Erro ao buscar produto"
            });
        }
    }


    async delete(req, res) {

        try {

            const { id } = req.params;


            const result =
                await productModel.deleteProduct(id);


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }


            return res.status(200).json({
                message: "Produto removido com sucesso"
            });

        } catch (error) {

            console.error("Erro ao remover produto:", error);

            return res.status(500).json({
                message: "Erro ao remover produto"
            });
        }
    }


    /* =========================================================
       UPLOAD DA IMAGEM DO PRODUTO
       ========================================================= */

    async uploadImage(req, res) {

        try {

            if (!req.file) {

                return res.status(400).json({
                    message: "Nenhuma imagem foi enviada"
                });

            }


            const caminhoImagem =
                `/uploads/produtos/${req.file.filename}`;


            return res.status(200).json({

                message:
                    "Imagem enviada com sucesso",

                imagem:
                    caminhoImagem

            });


        } catch (error) {

            console.error(
                "Erro ao enviar imagem do produto:",
                error
            );


            return res.status(500).json({
                message:
                    "Erro ao enviar imagem do produto"
            });

        }

    }

}


export default new ProductController();