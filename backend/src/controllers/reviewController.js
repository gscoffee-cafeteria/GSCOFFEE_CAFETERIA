import ReviewModel from "../models/reviewModel.js";


const ReviewController = {

    async getPublicReviews(req, res) {

        try {

            const avaliacoes =
                await ReviewModel.getPublicReviews();

            return res.status(200).json(
                avaliacoes
            );

        } catch (error) {

            console.error(
                "Erro ao buscar avaliações:",
                error
            );

            return res.status(500).json({
                message:
                    "Erro ao buscar avaliações."
            });

        }

    },

    async createReview(req, res) {

    try {

        const {
            nome_avaliador,
            nota,
            comentario,
            origem
        } = req.body;


        if (
            !nome_avaliador ||
            !comentario ||
            !origem
        ) {

            return res.status(400).json({
                message:
                    "Preencha todos os campos."
            });

        }


        const notaNumero = Number(nota);

if (
    !Number.isInteger(notaNumero) ||
    notaNumero < 1 ||
    notaNumero > 5
) {

    return res.status(400).json({
        message:
            "A nota deve ser de 1 a 5."
    });

}

        if (
            origem !== "Google" &&
            origem !== "Delivery"
        ) {

            return res.status(400).json({
                message:
                    "A origem deve ser Google ou Delivery."
            });

        }


        const result =
            await ReviewModel.createReview({
                nome_avaliador,
                nota: Number(nota),
                comentario,
                origem
            });


        return res.status(201).json({
            message:
                "Avaliação cadastrada com sucesso.",
            avaliacao_id:
                result.insertId
        });


    } catch (error) {

        console.error(
            "Erro ao cadastrar avaliação:",
            error
        );


        return res.status(500).json({
            message:
                "Erro ao cadastrar avaliação."
        });

    }

},

async getAdminReviews(req, res) {

    try {

        const avaliacoes =
            await ReviewModel.getAdminReviews();

        return res.status(200).json(
            avaliacoes
        );

    } catch (error) {

        console.error(
            "Erro ao buscar avaliações do admin:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao buscar avaliações do admin."
        });

    }

},

    async updateReview(req, res) {

    try {

        const { id } = req.params;

        const {
            nome_avaliador,
            nota,
            comentario,
            origem
        } = req.body;


        if (
            !nome_avaliador ||
            !comentario ||
            !origem
        ) {

            return res.status(400).json({
                message:
                    "Preencha todos os campos."
            });

        }


        const notaNumero = Number(nota);

        if (
            !Number.isInteger(notaNumero) ||
            notaNumero < 1 ||
            notaNumero > 5
        ) {

            return res.status(400).json({
                message:
                    "A nota deve ser de 1 a 5."
            });

        }


        if (
            origem !== "Google" &&
            origem !== "Delivery"
        ) {

            return res.status(400).json({
                message:
                    "A origem deve ser Google ou Delivery."
            });

        }


        const result =
            await ReviewModel.updateReview(
                id,
                {
                    nome_avaliador,
                    nota: notaNumero,
                    comentario,
                    origem
                }
            );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message:
                    "Avaliação não encontrada."
            });

        }


        return res.status(200).json({
            message:
                "Avaliação atualizada com sucesso."
        });


    } catch (error) {

        console.error(
            "Erro ao atualizar avaliação:",
            error
        );


        return res.status(500).json({
            message:
                "Erro ao atualizar avaliação."
        });
    }
},

async updatePublishedStatus(req, res) {

    try {

        const { id } = req.params;

        const { publicada } = req.body;

        const publicadaNumero =
            Number(publicada);

        if (
            publicadaNumero !== 0 &&
            publicadaNumero !== 1
        ) {

            return res.status(400).json({
                message:
                    "O status de publicação deve ser 0 ou 1."
            });

        }


        const result =
            await ReviewModel.updatePublishedStatus(
                id,
                publicadaNumero
            );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message:
                    "Avaliação não encontrada."
            });

        }


        return res.status(200).json({
            message:
                publicadaNumero === 1
                    ? "Avaliação publicada no site."
                    : "Avaliação ocultada do site."
        });


    } catch (error) {

        console.error(
            "Erro ao alterar publicação da avaliação:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao alterar publicação da avaliação."
        });

    }

},

async deleteReview(req, res) {

    try {

        const { id } = req.params;

        const result =
            await ReviewModel.deleteReview(id);

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message:
                    "Avaliação não encontrada."
            });

        }

        return res.status(200).json({
            message:
                "Avaliação excluída com sucesso."
        });

    } catch (error) {

        console.error(
            "Erro ao excluir avaliação:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao excluir avaliação."
        });

    }

}

};


export default ReviewController;