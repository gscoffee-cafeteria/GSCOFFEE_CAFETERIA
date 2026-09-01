import {
    getUserAddresses,
    createUserAddress,
    updateUserAddress,
    deleteUserAddress
} from "../models/userAddressModel.js";


export async function listUserAddresses(req, res) {
    try {
        const usuario_id = req.user.usuario_id;

        const addresses =
            await getUserAddresses(usuario_id);

        return res.json(addresses);

    } catch (error) {

        console.error(
            "Erro ao listar endereços:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao carregar endereços."
        });
    }
}


export async function createAddress(req, res) {
    try {
        const usuario_id =
            req.user.usuario_id;

        const {
            apelido,
            cep,
            rua,
            numero,
            bairro,
            complemento
        } = req.body;


        if (
            !apelido ||
            !cep ||
            !rua ||
            !numero ||
            !bairro
        ) {
            return res.status(400).json({
                message:
                    "Preencha todos os campos obrigatórios."
            });
        }


        const endereco_id =
            await createUserAddress(
                usuario_id,
                {
                    apelido,
                    cep,
                    rua,
                    numero,
                    bairro,
                    complemento
                }
            );


        return res.status(201).json({
            message:
                "Endereço salvo com sucesso!",
            endereco_id
        });

    } catch (error) {

        console.error(
            "Erro ao salvar endereço:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao salvar endereço."
        });
    }
}


export async function editAddress(req, res) {
    try {
        const usuario_id =
            req.user.usuario_id;

        const endereco_id =
            req.params.id;

        const {
            apelido,
            cep,
            rua,
            numero,
            bairro,
            complemento
        } = req.body;


        if (
            !apelido ||
            !cep ||
            !rua ||
            !numero ||
            !bairro
        ) {
            return res.status(400).json({
                message:
                    "Preencha todos os campos obrigatórios."
            });
        }


        const result =
            await updateUserAddress(
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
            );


        if (result.affectedRows === 0) {
            return res.status(404).json({
                message:
                    "Endereço não encontrado."
            });
        }


        return res.json({
            message:
                "Endereço atualizado com sucesso!"
        });

    } catch (error) {

        console.error(
            "Erro ao atualizar endereço:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao atualizar endereço."
        });
    }
}


export async function removeAddress(req, res) {
    try {
        const usuario_id =
            req.user.usuario_id;

        const endereco_id =
            req.params.id;


        const result =
            await deleteUserAddress(
                usuario_id,
                endereco_id
            );


        if (result.affectedRows === 0) {
            return res.status(404).json({
                message:
                    "Endereço não encontrado."
            });
        }


        return res.json({
            message:
                "Endereço excluído com sucesso!"
        });

    } catch (error) {

        console.error(
            "Erro ao excluir endereço:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao excluir endereço."
        });
    }
}