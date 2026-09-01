import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


export async function enviarCodigoRecuperacao(
    email,
    codigo
) {

    await transporter.sendMail({
        from: `"GS Coffee" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "Recuperação de senha - GS Coffee",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 500px;
                margin: auto;
                padding: 25px;
            ">

                <h2>
                    ☕ GS Coffee
                </h2>

                <p>
                    Recebemos uma solicitação para
                    redefinir sua senha.
                </p>

                <p>
                    Seu código de recuperação é:
                </p>

                <div style="
                    font-size: 28px;
                    font-weight: bold;
                    letter-spacing: 6px;
                    margin: 20px 0;
                ">
                    ${codigo}
                </div>

                <p>
                    Esse código expira em 10 minutos.
                </p>

                <p>
                    Se você não solicitou a alteração
                    de senha, pode ignorar este e-mail.
                </p>

            </div>
        `
    });

}