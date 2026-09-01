import pool from "../database/database.js";

class SettingsModel {

    /* =========================================================
       BUSCAR CONFIGURAÇÕES
       ========================================================= */

    async getSettings() {

        const [rows] =
            await pool.execute(`
                SELECT *
                FROM configuracoes_site
                WHERE configuracao_id = 1
            `);

        return rows[0];
    }


    /* =========================================================
   ATUALIZAR CONFIGURAÇÕES GERAIS
   ========================================================= */

async updateSettings(dados) {

    const {
        hero_titulo,
        hero_subtitulo,
        hero_texto,
        formas_pagamento
    } = dados;


    const [result] =
        await pool.execute(
            `
            INSERT INTO configuracoes_site
            (
                configuracao_id,
                hero_titulo,
                hero_subtitulo,
                hero_texto,
                formas_pagamento
            )
            VALUES
            (
                1,
                ?,
                ?,
                ?,
                ?
            )

            ON DUPLICATE KEY UPDATE

                hero_titulo = VALUES(hero_titulo),
                hero_subtitulo = VALUES(hero_subtitulo),
                hero_texto = VALUES(hero_texto),
                formas_pagamento = VALUES(formas_pagamento)
            `,
            [
                hero_titulo || "",
                hero_subtitulo || "",
                hero_texto || "",
                formas_pagamento || ""
            ]
        );


    return result;
}


    /* =========================================================
       ATUALIZAR FOTO OU VÍDEO DO HERO
       ========================================================= */

    async updateHeroMedia(
        tipoMidia,
        caminhoArquivo
    ) {

        let result;


        if (tipoMidia === "video") {

            [result] =
                await pool.execute(
                    `
                    UPDATE configuracoes_site
                    SET
                        hero_video = ?,
                        hero_imagem = ''
                    WHERE configuracao_id = 1
                    `,
                    [
                        caminhoArquivo
                    ]
                );

        } else {

            [result] =
                await pool.execute(
                    `
                    UPDATE configuracoes_site
                    SET
                        hero_imagem = ?,
                        hero_video = ''
                    WHERE configuracao_id = 1
                    `,
                    [
                        caminhoArquivo
                    ]
                );

        }


        return result;
    }

}


export default new SettingsModel();