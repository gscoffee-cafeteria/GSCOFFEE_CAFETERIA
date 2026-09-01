import {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact
} from "../models/contactModel.js";


export async function listarContatos(req, res) {
    try {

        const contatos =
            await getAllContacts();

        return res.json(contatos);

    } catch (error) {

        console.error(
            "Erro ao listar contatos:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao listar contatos"
        });

    }
}


export async function cadastrarContato(req, res) {
    try {

        const {
            tipo,
            nome,
            valor,
            ativo = 1
        } = req.body;


        if (!tipo || !valor) {

            return res.status(400).json({
                message:
                    "Tipo e valor são obrigatórios"
            });

        }


        const contato_id =
            await createContact({
                tipo,
                nome,
                valor,
                ativo
            });


        return res.status(201).json({
            message:
                "Contato cadastrado com sucesso",
            contato_id
        });

    } catch (error) {

        console.error(
            "Erro ao cadastrar contato:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao cadastrar contato"
        });

    }
}


export async function editarContato(req, res) {
    try {

        const { contato_id } =
            req.params;


        const {
            tipo,
            nome,
            valor,
            ativo = 1
        } = req.body;


        if (!tipo || !valor) {

            return res.status(400).json({
                message:
                    "Tipo e valor são obrigatórios"
            });

        }


        const result =
            await updateContact(
                contato_id,
                {
                    tipo,
                    nome,
                    valor,
                    ativo
                }
            );


        if (
            result.affectedRows === 0
        ) {

            return res.status(404).json({
                message:
                    "Contato não encontrado"
            });

        }


        return res.json({
            message:
                "Contato atualizado com sucesso"
        });

    } catch (error) {

        console.error(
            "Erro ao editar contato:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao editar contato"
        });

    }
}


export async function removerContato(req, res) {
    try {

        const { contato_id } =
            req.params;


        const result =
            await deleteContact(
                contato_id
            );


        if (
            result.affectedRows === 0
        ) {

            return res.status(404).json({
                message:
                    "Contato não encontrado"
            });

        }


        return res.json({
            message:
                "Contato removido com sucesso"
        });

    } catch (error) {

        console.error(
            "Erro ao remover contato:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao remover contato"
        });

    }
}