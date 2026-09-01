import pool from "./database.js";

export async function ensureOrderTables() {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS pedidos (
            pedido_id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            total DECIMAL(10,2) NOT NULL DEFAULT 0,
            status ENUM('recebido','preparando','saiu_entrega','entregue','cancelado') NOT NULL DEFAULT 'recebido',
            pagamento VARCHAR(30) NOT NULL,
            nome_entrega VARCHAR(120) NOT NULL,
            telefone VARCHAR(30) NOT NULL,
            cep VARCHAR(15) NOT NULL,
            rua VARCHAR(180) NOT NULL,
            numero VARCHAR(20) NOT NULL,
            bairro VARCHAR(120) NOT NULL,
            complemento VARCHAR(180) NULL,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_pedidos_usuario (usuario_id),
            INDEX idx_pedidos_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
        CREATE TABLE IF NOT EXISTS pedido_itens (
            item_id INT AUTO_INCREMENT PRIMARY KEY,
            pedido_id INT NOT NULL,
            produto_id VARCHAR(80) NULL,
            nome_produto VARCHAR(180) NOT NULL,
            quantidade INT NOT NULL,
            preco_unitario DECIMAL(10,2) NOT NULL,
            INDEX idx_itens_pedido (pedido_id),
            CONSTRAINT fk_itens_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
}
