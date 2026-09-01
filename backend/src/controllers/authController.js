import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { enviarCodigoRecuperacao } from "../utils/emailService.js";

function validarCPF(valor) {

    const cpf =
        String(valor || "")
            .replace(/\D/g, "");

    if (
        cpf.length !== 11 ||
        /^(\d)\1{10}$/.test(cpf)
    ) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let digito =
        (soma * 10) % 11;

    if (digito === 10) {
        digito = 0;
    }

    if (digito !== Number(cpf[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    digito =
        (soma * 10) % 11;

    if (digito === 10) {
        digito = 0;
    }

    return digito === Number(cpf[10]);
}


function validarCNPJ(valor) {

    const cnpj =
        String(valor || "")
            .replace(/\D/g, "");

    if (
        cnpj.length !== 14 ||
        /^(\d)\1{13}$/.test(cnpj)
    ) {
        return false;
    }

    function calcularDigito(numeros, pesos) {

        let soma = 0;

        for (let i = 0; i < pesos.length; i++) {
            soma += Number(numeros[i]) * pesos[i];
        }

        const resto = soma % 11;

        return resto < 2
            ? 0
            : 11 - resto;
    }

    const primeiroDigito =
        calcularDigito(
            cnpj,
            [
                5, 4, 3, 2,
                9, 8, 7, 6,
                5, 4, 3, 2
            ]
        );

    if (
        primeiroDigito !==
        Number(cnpj[12])
    ) {
        return false;
    }

    const segundoDigito =
        calcularDigito(
            cnpj,
            [
                6, 5, 4, 3, 2,
                9, 8, 7, 6,
                5, 4, 3, 2
            ]
        );

    return segundoDigito === Number(cnpj[13]);
}

class AuthController {


    async login(req, res) {

        try {

            const {
                email,
                senha
            } = req.body;


            if (!email || !senha) {

                return res.status(400).json({
                    message:
                        "Email/usuário e senha são obrigatórios"
                });

            }


            const user =
                await userModel.findByLogin(
                    email
                );


            if (!user) {

                return res.status(401).json({
                    message:
                        "Email/usuário ou senha inválidos"
                });

            }


            const senhaValida =
                await bcrypt.compare(
                    senha,
                    user.senha
                );


            if (!senhaValida) {

                return res.status(401).json({
                    message:
                        "Email/usuário ou senha inválidos"
                });

            }


            const token =
                generateToken(user);


            return res.status(200).json({

                message:
                    "Login realizado com sucesso",

                token,

                usuario: {

                    usuario_id:
                        user.usuario_id,

                    nome:
                        user.nome,

                    email:
                        user.email,

                    telefone:
                        user.telefone,

                    cpf:
                        user.cpf,

                    data_nascimento:
                        user.data_nascimento,

                    role:
                        user.role

                }

            });


        } catch (error) {

            console.error(
                "Erro no login:",
                error
            );


            return res.status(500).json({
                message:
                    "Erro interno do servidor"
            });

        }

    }


    async register(req, res) {

        try {

            const {
                nome,
                email,
                senha,
                telefone
            } = req.body;


            if (
                !nome ||
                !email ||
                !senha ||
                !telefone
            ) {

                return res.status(400).json({
                    message:
                        "Nome, email, telefone e senha são obrigatórios"
                });

            }


            if (
                senha.length < 6
            ) {

                return res.status(400).json({
                    message:
                        "A senha precisa ter pelo menos 6 caracteres"
                });

            }


            const existing =
                await userModel.findByEmail(
                    email
                );


            if (existing) {

                return res.status(409).json({
                    message:
                        "Este email já está cadastrado"
                });

            }


            const hash =
                await bcrypt.hash(
                    senha,
                    10
                );


            const result =
                await userModel.createUser(
                    nome,
                    email,
                    hash,
                    telefone,
                    "cliente"
                );


            const user = {

                usuario_id:
                    result.insertId,

                nome,

                email,

                telefone,

                cpf:
                    null,

                data_nascimento:
                    null,

                role:
                    "cliente"

            };


            const token =
                generateToken(user);


            return res.status(201).json({

                message:
                    "Conta criada com sucesso",

                token,

                usuario:
                    user

            });


        } catch (error) {

            console.error(
                "Erro no cadastro:",
                error
            );


            if (
                error.code ===
                "ER_DUP_ENTRY"
            ) {

                return res.status(409).json({
                    message:
                        "Este email já está cadastrado"
                });

            }


            return res.status(500).json({
                message:
                    "Não foi possível criar sua conta"
            });

        }

    }


    async me(req, res) {

        try {

            const usuario =
                await userModel.findById(
                    req.user.usuario_id
                );


            if (!usuario) {

                return res.status(404).json({
                    message:
                        "Usuário não encontrado"
                });

            }


            return res.status(200).json({
                usuario
            });


        } catch (error) {

            console.error(
                "Erro ao buscar perfil:",
                error
            );


            return res.status(500).json({
                message:
                    "Erro ao buscar perfil"
            });

        }

    }


    async updateMe(req, res) {

    try {

        const id =
            req.user.usuario_id;

        const {
            nome,
            email,
            telefone,
            cpf,
            data_nascimento
        } = req.body;


        if (
            !nome ||
            !email ||
            !telefone
        ) {
            return res.status(400).json({
                message:
                    "Nome, e-mail e telefone são obrigatórios."
            });
        }


        const usuarioAtual =
            await userModel.findById(id);

        if (!usuarioAtual) {
            return res.status(404).json({
                message:
                    "Usuário não encontrado."
            });
        }


        const usuarioEmail =
            await userModel.findByEmail(email);

        if (
            usuarioEmail &&
            usuarioEmail.usuario_id !== id
        ) {
            return res.status(409).json({
                message:
                    "Este e-mail já está sendo utilizado."
            });
        }


        const documento =
            cpf
                ? String(cpf)
                    .replace(/\D/g, "")
                : null;


        if (documento) {

            if (
                usuarioAtual.role === "admin"
            ) {

                const valido =
                    (
                        documento.length === 11 &&
                        validarCPF(documento)
                    ) ||
                    (
                        documento.length === 14 &&
                        validarCNPJ(documento)
                    );

                if (!valido) {
                    return res.status(400).json({
                        message:
                            "Informe um CPF ou CNPJ válido."
                    });
                }

            } else {

                if (
                    documento.length !== 11 ||
                    !validarCPF(documento)
                ) {
                    return res.status(400).json({
                        message:
                            "Informe um CPF válido."
                    });
                }
            }
        }


        await userModel.updateProfile(
            id,
            nome,
            email,
            telefone,
            documento,
            data_nascimento
        );


        const usuario =
            await userModel.findById(id);


        return res.status(200).json({
            message:
                "Perfil atualizado com sucesso.",
            usuario
        });

    } catch (error) {

        console.error(
            "Erro ao atualizar perfil:",
            error
        );

        return res.status(500).json({
            message:
                "Erro interno do servidor."
        });
    }
}


    async changePassword(req, res) {

        try {

            const id =
                req.user.usuario_id;


            const {
                senha_atual,
                nova_senha
            } = req.body;


            if (
                !senha_atual ||
                !nova_senha
            ) {

                return res.status(400).json({
                    message:
                        "Senha atual e nova senha são obrigatórias"
                });

            }


            if (
                nova_senha.length < 6
            ) {

                return res.status(400).json({
                    message:
                        "A nova senha precisa ter pelo menos 6 caracteres"
                });

            }


            const usuario =
                await userModel.findById(
                    id
                );


            if (!usuario) {

                return res.status(404).json({
                    message:
                        "Usuário não encontrado"
                });

            }


            const usuarioComSenha =
                await userModel.findByEmail(
                    usuario.email
                );


            const senhaCorreta =
                await bcrypt.compare(
                    senha_atual,
                    usuarioComSenha.senha
                );


            if (!senhaCorreta) {

                return res.status(401).json({
                    message:
                        "Senha atual incorreta"
                });

            }


            const hash =
                await bcrypt.hash(
                    nova_senha,
                    10
                );


            await userModel.updatePassword(
                id,
                hash
            );


            return res.status(200).json({
                message:
                    "Senha alterada com sucesso"
            });


        } catch (error) {

            console.error(
                "Erro ao alterar senha:",
                error
            );


            return res.status(500).json({
                message:
                    "Erro ao alterar senha"
            });

        }

    }


    /* =========================================================
       ESQUECI MINHA SENHA
       ========================================================= */

    async forgotPassword(req, res) {

        try {

            const {
                email
            } = req.body;


            if (!email) {

                return res.status(400).json({
                    message:
                        "Informe o email cadastrado"
                });

            }


            const usuario =
                await userModel.findByEmail(
                    email
                );


            if (!usuario) {

                return res.status(404).json({
                    message:
                        "Usuário não encontrado"
                });

            }


            /*
              Gera código de 6 dígitos.
            */

            const codigo =
                String(
                    Math.floor(
                        100000 +
                        Math.random() *
                        900000
                    )
                );


            /*
              Código válido por 15 minutos.
            */

            const expiracao =
                new Date(
                    Date.now() +
                    10 * 60 * 1000
                );


            await userModel.createRecoveryCode(
                usuario.usuario_id,
                codigo,
                expiracao
            );


            await enviarCodigoRecuperacao(
    usuario.email,
    codigo
);


return res.status(200).json({

    message:
        "Enviamos um código de recuperação para o seu e-mail"

});


        } catch (error) {

            console.error(
                "Erro ao gerar código de recuperação:",
                error
            );


            return res.status(500).json({
                message:
                    "Não foi possível gerar o código de recuperação"
            });

        }

    }


    /* =========================================================
       REDEFINIR SENHA
       ========================================================= */

    async resetPassword(req, res) {

        try {

            const {
                email,
                codigo,
                nova_senha
            } = req.body;


            if (
                !email ||
                !codigo ||
                !nova_senha
            ) {

                return res.status(400).json({
                    message:
                        "Email, código e nova senha são obrigatórios"
                });

            }


            if (
                nova_senha.length < 6
            ) {

                return res.status(400).json({
                    message:
                        "A nova senha precisa ter pelo menos 6 caracteres"
                });

            }


            const usuario =
                await userModel.findByEmail(
                    email
                );


            if (!usuario) {

                return res.status(404).json({
                    message:
                        "Usuário não encontrado"
                });

            }


            const recuperacao =
                await userModel.findValidRecoveryCode(
                    usuario.usuario_id,
                    codigo
                );


            if (!recuperacao) {

                return res.status(400).json({
                    message:
                        "Código inválido ou expirado"
                });

            }


            const hash =
                await bcrypt.hash(
                    nova_senha,
                    10
                );


            await userModel.resetPassword(
                usuario.usuario_id,
                hash
            );


            await userModel.markRecoveryCodeAsUsed(
                recuperacao.id
            );


            return res.status(200).json({
                message:
                    "Senha redefinida com sucesso"
            });


        } catch (error) {

            console.error(
                "Erro ao redefinir senha:",
                error
            );


            return res.status(500).json({
                message:
                    "Não foi possível redefinir a senha"
            });

        }

    }

}


export default new AuthController();