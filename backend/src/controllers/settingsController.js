import settingsModel from "../models/settingsModel.js";

class SettingsController {

    async get(req, res) {

        try {

            const configuracoes =
                await settingsModel.getSettings();

            if (!configuracoes) {

                return res.status(404).json({
                    message: "Configurações não encontradas"
                });
            }

            return res.status(200).json(configuracoes);

        } catch (error) {

            console.error(
                "Erro ao buscar configurações:",
                error
            );

            return res.status(500).json({
                message: "Erro ao buscar configurações"
            });
        }
    }


    async update(req, res) {

        try {

            await settingsModel.updateSettings(req.body);

            const configuracoesAtualizadas =
                await settingsModel.getSettings();

            return res.status(200).json({
                message: "Configurações atualizadas com sucesso",
                configuracoes: configuracoesAtualizadas
            });

        } catch (error) {

            console.error(
                "Erro ao atualizar configurações:",
                error
            );

            return res.status(500).json({
                message: "Erro ao atualizar configurações"
            });
        }
    }


    /* =========================================================
       UPLOAD DA MÍDIA DO HERO
       ========================================================= */

       async uploadHero(req, res) {

        try {
    
            if (!req.file) {
    
                return res.status(400).json({
                    message: "Nenhum arquivo foi enviado"
                });
    
            }
    
    
            const tipoMidia =
                req.file.mimetype.startsWith("video/")
                    ? "video"
                    : "imagem";
    
    
            const caminhoArquivo =
                `/uploads/hero/${req.file.filename}`;
    
    
            await settingsModel.updateHeroMedia(
                tipoMidia,
                caminhoArquivo
            );
    
    
            const configuracoesAtualizadas =
                await settingsModel.getSettings();
    
    
            return res.status(200).json({
    
                message:
                    "Mídia do hero atualizada com sucesso",
    
                tipo:
                    tipoMidia,
    
                caminho:
                    caminhoArquivo,
    
                configuracoes:
                    configuracoesAtualizadas
    
            });
    
    
        } catch (error) {
    
            console.error(
                "Erro ao enviar mídia do hero:",
                error
            );
    
    
            return res.status(500).json({
                message:
                    "Erro ao enviar mídia do hero"
            });
    
        }
    
    }

}

export default new SettingsController();