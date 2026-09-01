import orderModel from "../models/orderModel.js";

const VALID_STATUS = ["recebido", "preparando", "saiu_entrega", "entregue", "cancelado"];

class OrderController {
    async create(req, res) {
        try {
            const { itens, endereco, pagamento } = req.body;
            if (!Array.isArray(itens) || !itens.length) return res.status(400).json({ message: "O pedido precisa ter pelo menos um item" });
            if (!endereco?.nome || !endereco?.telefone || !endereco?.cep || !endereco?.rua || !endereco?.numero || !endereco?.bairro) return res.status(400).json({ message: "Informe todos os dados obrigatórios de entrega" });
            const safeItems = itens.map(i => ({ ...i, quantidade: Number(i.quantidade), preco_unitario: Number(i.preco_unitario) }));
            if (safeItems.some(i => !i.nome || i.quantidade < 1 || i.preco_unitario < 0)) return res.status(400).json({ message: "Itens do pedido inválidos" });
            const total = safeItems.reduce((sum, i) => sum + i.quantidade * i.preco_unitario, 0);
            const pedido = await orderModel.createOrder({ usuario_id: req.user.usuario_id, total, pagamento: pagamento || "PIX", endereco, itens: safeItems });
            return res.status(201).json({ message: "Pedido criado com sucesso", pedido });
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            return res.status(500).json({ message: "Não foi possível registrar o pedido" });
        }

    }

    async getOne(req, res) {
        try {
            const pedido = await orderModel.findById(req.params.id, req.user.usuario_id);
            if (!pedido) return res.status(404).json({ message: "Pedido não encontrado" });
            return res.json({ pedido });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Não foi possível carregar o pedido" });
        }
    }

    async mine(req, res) {
        try { return res.json({ pedidos: await orderModel.findByUser(req.user.usuario_id) }); }
        catch (error) { console.error(error); return res.status(500).json({ message: "Não foi possível carregar seus pedidos" }); }
    }

    async all(req, res) {
        try { return res.json({ pedidos: await orderModel.findAll() }); }
        catch (error) { console.error(error); return res.status(500).json({ message: "Não foi possível carregar os pedidos" }); }
    }

    async updateStatus(req, res) {
        try {
            const { status } = req.body;
            if (!VALID_STATUS.includes(status)) return res.status(400).json({ message: "Status inválido" });
            const result = await orderModel.updateStatus(req.params.id, status);
            if (!result.affectedRows) return res.status(404).json({ message: "Pedido não encontrado" });
            return res.json({ message: "Status atualizado" });
        } catch (error) { console.error(error); return res.status(500).json({ message: "Não foi possível atualizar o status" }); }
    }

    async avaliar(req, res) {
    try {

        const pedidoId = req.params.id;
        const usuarioId = req.user.usuario_id;

        const { nota, comentario } = req.body;

        const notaNumero = Number(nota);

        if (
            !Number.isInteger(notaNumero) ||
            notaNumero < 1 ||
            notaNumero > 5
        ) {
            return res.status(400).json({
                message: "A nota deve ser de 1 a 5."
            });
        }

        if (!comentario || !comentario.trim()) {
            return res.status(400).json({
                message: "Escreva um comentário sobre o pedido."
            });
        }

        const pedido =
            await orderModel.findById(
                pedidoId,
                usuarioId
            );

        if (!pedido) {
            return res.status(404).json({
                message: "Pedido não encontrado."
            });
        }

        if (pedido.status !== "entregue") {
            return res.status(400).json({
                message:
                    "A avaliação só pode ser feita após a entrega do pedido."
            });
        }

        const avaliacaoExistente =
            await orderModel.findReviewByOrder(
                pedidoId,
                usuarioId
            );

        if (avaliacaoExistente) {
            return res.status(400).json({
                message:
                    "Este pedido já foi avaliado."
            });
        }

        const result =
            await orderModel.createOrderReview({
                pedido_id: pedidoId,
                usuario_id: usuarioId,
                nome_avaliador:
                    pedido.cliente_nome ||
                    req.user.nome ||
                    "Cliente",
                nota: notaNumero,
                comentario: comentario.trim()
            });

        return res.status(201).json({
            message:
                "Avaliação enviada com sucesso!",
            avaliacao_id:
                result.insertId
        });

    } catch (error) {

        console.error(
            "Erro ao avaliar pedido:",
            error
        );

        return res.status(500).json({
            message:
                "Não foi possível enviar a avaliação."
        });

    }
}

}

export default new OrderController();
