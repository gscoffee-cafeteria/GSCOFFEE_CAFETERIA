import {
    getAllAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} from "../models/addressModel.js";


export async function listarEnderecos(req, res) {
    try {

        const enderecos =
            await getAllAddresses();

        return res.json(enderecos);

    } catch (error) {

        console.error(
            "Erro ao listar endereços:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao listar endereços"
        });

    }
}


export async function cadastrarEndereco(req, res) {
    try {

        const {
            nome,
            endereco,
            horario_seg_sab,
            horario_domingo,
            horario_feriado,
            ativo = 1
        } = req.body;


        if (!endereco) {

            return res.status(400).json({
                message:
                    "O endereço é obrigatório"
            });

        }


        const endereco_id =
            await createAddress({
                nome,
                endereco,
                horario_seg_sab,
                horario_domingo,
                horario_feriado,
                ativo
            });


        return res.status(201).json({
            message:
                "Endereço cadastrado com sucesso",
            endereco_id
        });

    } catch (error) {

        console.error(
            "Erro ao cadastrar endereço:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao cadastrar endereço"
        });

    }
}


export async function editarEndereco(req, res) {
    try {

        const { endereco_id } =
            req.params;


        const {
            nome,
            endereco,
            horario_seg_sab,
            horario_domingo,
            horario_feriado,
            ativo = 1
        } = req.body;


        if (!endereco) {

            return res.status(400).json({
                message:
                    "O endereço é obrigatório"
            });

        }


        const result =
            await updateAddress(
                endereco_id,
                {
                    nome,
                    endereco,
                    horario_seg_sab,
                    horario_domingo,
                    horario_feriado,
                    ativo
                }
            );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message:
                    "Endereço não encontrado"
            });

        }


        return res.json({
            message:
                "Endereço atualizado com sucesso"
        });

    } catch (error) {

        console.error(
            "Erro ao editar endereço:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao editar endereço"
        });

    }
}


export async function removerEndereco(req, res) {
    try {

        const { endereco_id } =
            req.params;


        const result =
            await deleteAddress(
                endereco_id
            );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message:
                    "Endereço não encontrado"
            });

        }


        return res.json({
            message:
                "Endereço removido com sucesso"
        });

    } catch (error) {

        console.error(
            "Erro ao remover endereço:",
            error
        );

        return res.status(500).json({
            message:
                "Erro ao remover endereço"
        });

    }
}