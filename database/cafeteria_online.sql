-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: cafeteria_online
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `avaliacao_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `pedido_id` int DEFAULT NULL,
  `produto_id` int DEFAULT NULL,
  `nome_avaliador` varchar(120) DEFAULT NULL,
  `nota` int DEFAULT NULL,
  `comentario` text,
  `origem` varchar(30) DEFAULT 'site',
  `publicada` tinyint(1) NOT NULL DEFAULT '0',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`avaliacao_id`),
  UNIQUE KEY `uq_avaliacoes_pedido` (`pedido_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`produto_id`),
  CONSTRAINT `fk_avaliacoes_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`) ON DELETE SET NULL,
  CONSTRAINT `avaliacoes_chk_1` CHECK ((`nota` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (5,NULL,NULL,NULL,'Iara Silva',5,'Os doces são muito gostosos e chegaram super bem apresentados. Recomendo!','Delivery',1,'2026-08-30 05:36:34'),(6,2,6,NULL,'Iara Silva',5,'Pedido chegou perfeito!','Delivery',0,'2026-08-30 07:13:18'),(7,2,2,NULL,'Iara Silva',2,'ameeeiii, mas não veio talher!','Delivery',1,'2026-08-30 07:27:42'),(8,2,5,NULL,'Iara Silva',1,'detestei tudo','Delivery',0,'2026-08-30 14:13:37'),(9,2,1,NULL,'Iara Silva',3,'achei meia boca','Delivery',0,'2026-08-30 14:37:58'),(10,2,7,NULL,'Iara Silva',3,'sensacional, muito bom.','Delivery',1,'2026-08-30 14:47:43'),(12,NULL,NULL,NULL,'Iara Maria',4,'Os doces são muito gostosos e chegaram super bem apresentados. Recomendo!','Google',1,'2026-08-31 19:34:00'),(13,2,3,NULL,'Iara Silva',1,'no gosti','Delivery',1,'2026-08-31 20:23:41'),(14,NULL,NULL,NULL,'Iara Silva',5,'Os doces são muito gostosos e chegaram super bem apresentados. Recomendo!','Google',1,'2026-08-31 20:37:29'),(15,2,10,NULL,'Iara Silva',2,'d casd d ds','Delivery',0,'2026-08-31 20:41:04'),(16,4,11,NULL,'Camila Guimarães',5,'cremoso','Google',1,'2026-08-31 22:47:04'),(17,4,12,NULL,'Camila Guimarães',5,'Muito bom , cremoso','Delivery',1,'2026-08-31 22:56:13'),(18,NULL,NULL,NULL,'Camila Guimarães',5,'Milkshake muito cremoso e saboroso , nota milll','Google',1,'2026-08-31 22:57:18');
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrinhos`
--

DROP TABLE IF EXISTS `carrinhos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrinhos` (
  `carrinho_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`carrinho_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `carrinhos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrinhos`
--

LOCK TABLES `carrinhos` WRITE;
/*!40000 ALTER TABLE `carrinhos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrinhos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartoes_usuario`
--

DROP TABLE IF EXISTS `cartoes_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartoes_usuario` (
  `cartao_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nome_titular` varchar(120) NOT NULL,
  `bandeira` varchar(30) DEFAULT NULL,
  `ultimos_quatro` varchar(4) NOT NULL,
  `validade` varchar(5) NOT NULL,
  `tipo_cartao` varchar(20) NOT NULL,
  `token_ficticio` varchar(100) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartao_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `cartoes_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartoes_usuario`
--

LOCK TABLES `cartoes_usuario` WRITE;
/*!40000 ALTER TABLE `cartoes_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartoes_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `categoria_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Cafés'),(2,'Chás'),(3,'Doces'),(4,'Salgados'),(5,'Shakes'),(6,'Smoothies'),(7,'Refrigerantes e Águas');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracoes_site`
--

DROP TABLE IF EXISTS `configuracoes_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracoes_site` (
  `configuracao_id` int NOT NULL AUTO_INCREMENT,
  `hero_titulo` varchar(255) DEFAULT NULL,
  `hero_subtitulo` varchar(255) DEFAULT NULL,
  `hero_texto` text,
  `hero_imagem` varchar(255) DEFAULT NULL,
  `hero_video` varchar(255) DEFAULT NULL,
  `formas_pagamento` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`configuracao_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracoes_site`
--

LOCK TABLES `configuracoes_site` WRITE;
/*!40000 ALTER TABLE `configuracoes_site` DISABLE KEYS */;
INSERT INTO `configuracoes_site` VALUES (1,'O sabor que chega até você.','GS COFFEE','Cafés especiais, doces artesanais e bebidas preparadas com carinho para você pedir onde estiver.','','/uploads/hero/hero-1788223069612.mp4','PIX, Cartão e Dinheiro','2026-08-28 23:27:04','2026-09-01 00:37:49');
/*!40000 ALTER TABLE `configuracoes_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contatos`
--

DROP TABLE IF EXISTS `contatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contatos` (
  `contato_id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) NOT NULL,
  `nome` varchar(80) DEFAULT NULL,
  `valor` varchar(255) NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contato_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contatos`
--

LOCK TABLES `contatos` WRITE;
/*!40000 ALTER TABLE `contatos` DISABLE KEYS */;
INSERT INTO `contatos` VALUES (1,'whatsapp',NULL,'(11) 95490-8550',1,'2026-08-28 22:54:03'),(2,'instagram',NULL,'gscoffecafeteria',1,'2026-08-28 23:01:49'),(3,'telefone',NULL,'(11) 4002-8922',1,'2026-08-28 23:02:38'),(4,'whatsapp',NULL,'11988887777',1,'2026-08-31 23:01:34');
/*!40000 ALTER TABLE `contatos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos` (
  `endereco_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `horario_seg_sab` varchar(100) DEFAULT NULL,
  `horario_domingo` varchar(100) DEFAULT NULL,
  `horario_feriado` varchar(100) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`endereco_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
INSERT INTO `enderecos` VALUES (2,'Unidade Santo André','Av. Ramiro Colleoni, 110 - Vila Bastos, Santo André - SP, 09040-160','05:00 às 20:00','05:00 às 18:00','05:00 às 18:00',1,'2026-08-30 06:31:37'),(3,'Unidade São Bernado','Marechal Deodoro , 1500','09:00 as 13:00','10:00 as 12:00','09:00 as 12:00',1,'2026-08-31 23:03:00');
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos_usuario`
--

DROP TABLE IF EXISTS `enderecos_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos_usuario` (
  `endereco_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `apelido` varchar(50) NOT NULL,
  `cep` varchar(15) NOT NULL,
  `rua` varchar(180) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(120) NOT NULL,
  `complemento` varchar(180) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`endereco_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `enderecos_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos_usuario`
--

LOCK TABLES `enderecos_usuario` WRITE;
/*!40000 ALTER TABLE `enderecos_usuario` DISABLE KEYS */;
INSERT INTO `enderecos_usuario` VALUES (2,2,'Casa','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-28 21:02:27'),(3,2,'Senac Santo André','09040160','Avenida Ramiro Colleoni','110','Centro','Senac Santo André','2026-08-28 21:05:52'),(6,1,'GS COFFEE','09040160','Avenida Ramiro Colleoni','110','Centro','Senac Santo André','2026-08-31 18:57:19'),(7,4,'Casa','09000000','Rua das Acácias','200','Vila Central','Apto 20','2026-08-31 22:41:47');
/*!40000 ALTER TABLE `enderecos_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_carrinho`
--

DROP TABLE IF EXISTS `itens_carrinho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_carrinho` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `carrinho_id` int NOT NULL,
  `produto_id` int NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `carrinho_id` (`carrinho_id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `itens_carrinho_ibfk_1` FOREIGN KEY (`carrinho_id`) REFERENCES `carrinhos` (`carrinho_id`),
  CONSTRAINT `itens_carrinho_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_carrinho`
--

LOCK TABLES `itens_carrinho` WRITE;
/*!40000 ALTER TABLE `itens_carrinho` DISABLE KEYS */;
/*!40000 ALTER TABLE `itens_carrinho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_itens`
--

DROP TABLE IF EXISTS `pedido_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_itens` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `produto_id` int DEFAULT NULL,
  `nome_produto` varchar(150) DEFAULT NULL,
  `quantidade` int NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `pedido_itens_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_itens_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`produto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_itens`
--

LOCK TABLES `pedido_itens` WRITE;
/*!40000 ALTER TABLE `pedido_itens` DISABLE KEYS */;
INSERT INTO `pedido_itens` VALUES (1,1,44,'Cappuccino Artesanal',1,15.00),(2,1,42,'Latte Caramelizado',1,15.00),(3,2,12,'Aurora de Frutas Silvestres cheesecake',1,20.90),(4,2,21,'Croissant de Nutella',1,15.00),(5,2,16,'Cupcakes',1,8.00),(6,3,44,'Cappuccino Artesanal',1,15.00),(7,3,4,'Affogato',1,10.00),(8,3,35,'Água',1,5.00),(9,4,44,'Cappuccino Artesanal',1,15.00),(10,4,42,'Latte Caramelizado',2,15.00),(11,4,43,'Supremo Gelado',1,18.00),(12,4,41,'Chocolate Quente',1,16.00),(13,5,4,'Affogato',1,10.00),(14,5,1,'Café Expresso',1,6.00),(15,5,2,'Cappuccino',1,8.00),(16,5,44,'Cappuccino Artesanal',1,15.00),(17,5,5,'Cold Brew',1,7.00),(18,6,4,'Affogato',1,10.00),(19,6,NULL,'cafe',1,1.00),(20,6,1,'Café Expresso',1,6.00),(21,6,2,'Cappuccino',1,8.00),(22,7,44,'Cappuccino Artesanal',1,15.00),(23,7,42,'Latte Caramelizado',1,15.00),(24,7,9,'Chá de Camomila',1,5.00),(31,10,44,'Cappuccino Artesanal',1,15.00),(32,10,42,'Latte Caramelizado',1,15.00),(33,10,43,'Supremo Gelado',1,18.00),(34,10,12,'Aurora de Frutas Silvestres cheesecake',1,20.90),(35,10,10,'Banoffee',1,16.90),(37,11,44,'Cappuccino Artesanal',1,15.00),(38,11,42,'Latte Caramelizado',2,15.00),(39,11,43,'Supremo Gelado',1,18.00),(40,12,33,'Smoothie de Abacate e Banana',2,14.00);
/*!40000 ALTER TABLE `pedido_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_status_historico`
--

DROP TABLE IF EXISTS `pedido_status_historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_status_historico` (
  `historico_id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `status` enum('recebido','preparando','saiu_entrega','entregue','cancelado') NOT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`historico_id`),
  KEY `pedido_id` (`pedido_id`),
  CONSTRAINT `pedido_status_historico_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_status_historico`
--

LOCK TABLES `pedido_status_historico` WRITE;
/*!40000 ALTER TABLE `pedido_status_historico` DISABLE KEYS */;
INSERT INTO `pedido_status_historico` VALUES (1,1,'preparando','2026-08-28 03:29:55'),(3,1,'saiu_entrega','2026-08-28 03:33:12'),(4,1,'recebido','2026-08-28 03:15:52'),(5,1,'entregue','2026-08-28 03:56:53'),(6,2,'recebido','2026-08-28 03:58:36'),(7,2,'preparando','2026-08-28 03:59:10'),(8,2,'saiu_entrega','2026-08-28 03:59:51'),(9,2,'entregue','2026-08-28 04:00:42'),(10,3,'recebido','2026-08-28 21:06:53'),(11,4,'recebido','2026-08-28 21:22:32'),(12,5,'recebido','2026-08-29 00:13:00'),(13,5,'preparando','2026-08-29 00:19:37'),(14,5,'saiu_entrega','2026-08-29 00:19:50'),(15,5,'entregue','2026-08-29 00:20:15'),(16,5,'cancelado','2026-08-29 00:20:21'),(17,5,'entregue','2026-08-29 00:20:37'),(18,6,'recebido','2026-08-29 00:49:57'),(19,6,'preparando','2026-08-29 00:50:49'),(20,6,'entregue','2026-08-29 00:50:59'),(21,7,'recebido','2026-08-30 14:45:07'),(22,7,'preparando','2026-08-30 14:45:24'),(23,7,'saiu_entrega','2026-08-30 14:45:28'),(24,7,'entregue','2026-08-30 14:47:11'),(31,4,'entregue','2026-08-31 19:12:51'),(32,3,'entregue','2026-08-31 19:12:53'),(33,10,'recebido','2026-08-31 20:21:10'),(34,10,'preparando','2026-08-31 20:40:33'),(35,10,'saiu_entrega','2026-08-31 20:40:40'),(36,10,'entregue','2026-08-31 20:40:49'),(37,11,'recebido','2026-08-31 22:42:08'),(38,11,'preparando','2026-08-31 22:46:26'),(39,11,'saiu_entrega','2026-08-31 22:46:33'),(40,11,'entregue','2026-08-31 22:46:39'),(41,11,'cancelado','2026-08-31 22:47:08'),(42,11,'entregue','2026-08-31 22:47:16'),(43,12,'recebido','2026-08-31 22:55:28'),(44,12,'entregue','2026-08-31 22:55:47');
/*!40000 ALTER TABLE `pedido_status_historico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `pedido_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` enum('recebido','preparando','saiu_entrega','entregue','cancelado') NOT NULL DEFAULT 'recebido',
  `pagamento` varchar(30) DEFAULT NULL,
  `nome_entrega` varchar(150) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `rua` varchar(180) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `bairro` varchar(120) DEFAULT NULL,
  `complemento` varchar(180) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pedido_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,2,30.00,'entregue','PIX','Iara','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-28 03:15:52','2026-09-01 20:20:50'),(2,2,43.90,'entregue','CARTAO','Iara','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-28 03:58:36','2026-09-01 20:20:50'),(3,2,30.00,'entregue','PIX','Iara','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-28 21:06:53','2026-09-01 20:20:50'),(4,2,79.00,'entregue','CARTAO','Iara','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-28 21:22:32','2026-09-01 20:20:50'),(5,2,46.00,'entregue','DINHEIRO','Iara','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-29 00:13:00','2026-09-01 20:20:50'),(6,2,25.00,'entregue','PIX','Iara','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-29 00:49:57','2026-09-01 20:20:50'),(7,2,35.00,'entregue','PIX','Iara Silva','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-30 14:45:07','2026-09-01 20:20:50'),(10,2,95.80,'entregue','CARTAO','Iara Silva','11999999999','09000000','Rua das Flores','100','Jardim Central','Apto 10','2026-08-31 20:21:10','2026-09-01 20:20:50'),(11,4,73.00,'entregue','CARTAO','Camila Guimarães','11888888888','09000000','Rua das Acácias','200','Vila Central','Apto 20','2026-08-31 22:42:08','2026-09-01 20:20:52'),(12,4,28.00,'entregue','PIX','Camila Guimarães','11888888888','09000000','Rua das Acácias','200','Vila Central','Apto 20','2026-08-31 22:55:28','2026-09-01 20:20:52');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `produto_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int DEFAULT '0',
  `imagem` varchar(255) DEFAULT NULL,
  `categoria_id` int NOT NULL,
  `disponivel` tinyint(1) DEFAULT '1',
  `retirada` tinyint(1) DEFAULT '1',
  `balcao` tinyint(1) DEFAULT '0',
  `mais_pedido` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`produto_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Café Expresso','O café expresso é preparado com grãos selecionados e extraído sob pressão, resultando em uma bebida forte, aromática e encorpada..',6.00,100,'/uploads/produtos/produto-1787883577558.jpg',1,1,1,0,0),(2,'Cappuccino','O cappuccino combina café expresso, leite vaporizado e uma camada cremosa de espuma, criando uma bebida suave e equilibrada. Levemente adocicado e com textura aveludada.',8.00,100,'/uploads/produtos/produto-1787883643502.jpg',1,1,1,0,0),(3,'Latte','Um latte cremoso e equilibrado, feito com café expresso, leite vaporizado e uma delicada arte no topo.',8.00,100,'/uploads/produtos/produto-1787883739652.jpg',1,1,1,0,0),(4,'Affogato','Café expresso quente servido sobre sorvete de baunilha, criando um contraste delicioso entre o calor do café e a cremosidade gelada. Uma opção doce, leve e perfeita para quem ama café com um toque especial.',10.50,94,'/uploads/produtos/produto-1787883779413.jpg',1,1,1,0,0),(5,'Cold Brew','Café preparado por extração a frio, resultando em uma bebida suave, menos ácida e naturalmente refrescante. Servido gelado, o cold brew é perfeito para quem busca um café leve, aromático e ideal para dias quentes.',7.00,100,'/uploads/produtos/produto-1787883832991.jpg',1,1,1,0,0),(6,'Frappé de Café','Um café gelado batido com gelo, cremoso e refrescante, finalizado com chantilly e calda de chocolate. Perfeito para quem gosta de uma bebida doce, leve e ideal para se refrescar sem abrir mão do sabor do café.',14.00,100,'/uploads/produtos/produto-1787883873573.jpg',1,1,1,0,0),(7,'Chá Preto','Um chá preto quente, de aroma marcante e cor intensa. Encorpado e reconfortante, é ideal para quem aprecia sabores mais fortes.',5.00,100,'/uploads/produtos/produto-1787883974319.png',2,1,1,0,0),(8,'Chá Verde','Um chá verde quente, de aroma marcante e cor intensa. Encorpado e reconfortante, é ideal para quem aprecia sabores mais fortes.',5.00,100,'/uploads/produtos/produto-1787884008758.jpg',2,1,1,0,0),(9,'Chá de Camomila','Um chá preto quente, de aroma marcante e cor intensa. Encorpado e reconfortante, é ideal para quem aprecia sabores mais fortes.',5.00,100,'/uploads/produtos/produto-1787884044693.png',2,1,1,0,0),(10,'Banoffee','Torta com banana, doce de leite e chantilly.',16.90,100,'/uploads/produtos/produto-1787884099764.png',3,1,1,0,0),(11,'Bolo de cenoura com chocolate','Bolo fofinho de cenoura coberto com uma calda cremosa de chocolate,',14.90,100,'/uploads/produtos/produto-1787884151407.png',3,1,1,0,0),(12,'Aurora de Frutas Silvestres cheesecake','Cheesecake aveludada com base crocante de cacau e um swirl secreto de frutas vermelhas. Finalizada com uma festa de frutas frescas e chantilly, é a união perfeita de acidez e cremosidade.',20.90,100,'/uploads/produtos/produto-1787884260335.png',3,1,1,0,0),(13,'Torta de Limão','Base amanteigada e crocante, recheio de limão intenso e aveludado. Coberta por uma nuvem de suspiro levemente tostado.',18.90,100,'/uploads/produtos/produto-1787884295598.png',3,1,1,0,0),(14,'Torta de Chocolate','Base densa de brownie e recheio de ganache 70% cacau, aveludado e intenso. Uma sobremesa de sabor profundo que derrete na boca, reservada para os amantes do verdadeiro chocolate.',18.90,100,'/uploads/produtos/produto-1787884365669.png',3,1,1,0,0),(15,'Macarons','Casquinhas crocantes de amêndoas com recheios cremosos. Uma paleta de cores e sabores (chocolate, pistache, frutas vermelhas, baunilha). A delicadeza e a sofisticação francesa em cada mordida.',28.00,100,'/uploads/produtos/produto-1787884417775.png',3,1,1,0,0),(16,'Cupcakes','Bolo de chocolate fofinho coberto por um frosting cremoso em cores vibrantes. Coroado com frutas frescas, é a doce explosão de sabor e felicidade em cada mordida.',8.00,100,'/uploads/produtos/produto-1787884463212.png',3,1,1,0,0),(17,'Mini Tortas Gourmet','Pequenas obras de arte para os olhos e o paladar. Crosta amanteigada e dourada, recheios vibrantes de frutas frescas, merengue tostado e chocolate cremoso. Cada mini torta é uma joia, uma experiência individual de sabor e requinte.',14.00,100,'/uploads/produtos/produto-1787884503316.png',3,1,1,0,0),(18,'Cookies','Cookies macios e cheios de sabor, recheados com generosidade. Desfrute da riqueza do Chocolate, do contraste do Red Velvet e do toque viciante do Caramelo Salgado. O melhor da confeitaria em suas mãos.',15.00,100,'/uploads/produtos/produto-1787884540277.jpg',3,1,1,0,0),(19,'Bolo de Laranja','Feito com raspas de laranja natural, possui uma textura incrivelmente úmida e um sabor intenso. É o par perfeito para o café, elevando o simples a extraordinário.',7.00,100,'/uploads/produtos/produto-1787884587468.png',3,1,1,0,0),(20,'Bolo de Fubá','Feito com fubá macio e raspas de laranja natural, tem uma textura úmida e um aroma irresistível. Um clássico caseiro que transforma o simples em extraordinário',7.00,100,'/uploads/produtos/produto-1787884617687.png',3,1,1,0,0),(21,'Croissant de Nutella','Camadas folhadas, amanteigadas e douradas, recheadas com Nutella cremosa. Uma combinação irresistível que derrete na boca.',15.00,100,'/uploads/produtos/produto-1787884658069.png',3,1,1,0,0),(22,'Croissant de Creme','Camadas folhadas, amanteigadas e douradas, recheadas com um creme suave e levemente adocicado. Um clássico irresistível para qualquer momento do dia.',13.00,100,'/uploads/produtos/produto-1787884694773.png',3,1,1,0,0),(23,'Croissant Presunto e Queijo','Um croissant dourado e macio, recheado com presunto e queijo derretido. Leve por fora, saboroso por dentro.',13.00,100,'/uploads/produtos/produto-1787884761094.png',4,1,1,0,0),(24,'Misto Quente Tostado','Pão grelhado , recheado com presunto, queijo derretido e fatias de tomate fresco.',10.00,100,'/uploads/produtos/produto-1787884817854.png',4,1,1,0,0),(25,'Empada de Frango','Uma empada tradicional, com massa macia e levemente amanteigada, recheada com frango bem temperado e cremoso.',12.00,100,'/uploads/produtos/produto-1787884853356.png',4,1,1,0,0),(26,'Folhato de Carne Moída','Um folhado dourado e crocante, recheado com carne moída bem temperada e suculenta. A combinação perfeita entre massa leve e sabor marcante.',12.00,100,'/uploads/produtos/produto-1787884890389.png',4,1,1,0,0),(27,'MilkShake Chocolate','Feito com um rico chocolate cremoso, este milkshake é finalizado com chantilly generoso, calda de chocolate, raspas de chocolate e uma cereja no topo.',16.00,100,'/uploads/produtos/produto-1787884952141.jpg',5,1,1,0,0),(28,'MilkShake Frutas Vermelhas','Feito com sorvete e morango de verdade, este milkshake tem uma textura irresistível. É finalizado com chantilly, calda de morango, e frutas frescas.',16.00,100,'/uploads/produtos/produto-1787884995876.jpg',5,1,1,0,0),(29,'Milkshake de Doce de Leite','Este milkshake é puro caramelo batido com sorvete, coberto com calda escorrendo, chantilly e pedacinhos crocantes de caramelo e amendoim.',16.00,100,'/uploads/produtos/produto-1787885033667.jpg',5,1,1,0,0),(30,'Smoothie de Frutas Vermelhas','Um smoothie incrivelmente refrescante e nutritivo, feito com a mistura perfeita de morangos, framboesas e mirtilos.',14.00,100,'/uploads/produtos/produto-1787885120868.jpg',6,1,1,0,0),(31,'Smoothie de Morango','Feito com morango fresco, framboesas e mirtilos, este smoothie é incrivelmente refrescante e nutritivo.',15.00,100,'/uploads/produtos/produto-1787885154517.jpg',6,1,1,0,0),(32,'Smoothie de Mirtilo','Feito com mirtilos frescos, oferece um sabor doce e sofisticado e uma textura super cremosa.',16.00,100,'/uploads/produtos/produto-1787885191332.jpg',6,1,1,0,0),(33,'Smoothie de Abacate e Banana','Feito com abacate fresco para uma textura extra cremosa e a doçura natural da banana.',14.00,100,'/uploads/produtos/produto-1787885234572.jpg',6,1,1,0,0),(34,'Smoothie de Manga','Feito com a manga mais doce, resultando em uma textura suave e cremosa e um sabor intensamente refrescante.',14.00,100,'/uploads/produtos/produto-1787885267318.jpg',6,1,1,0,0),(35,'Água','Água Mineral',5.00,100,'/uploads/produtos/produto-1787885308941.png',7,1,1,0,0),(36,'Água com Gás','Água com Gás',6.00,100,'/uploads/produtos/produto-1787885352556.jpg',7,1,1,0,0),(37,'Coca-Cola Lata','Coca Cola lata',6.00,100,'/uploads/produtos/produto-1787885380213.jpg',7,1,1,0,0),(38,'Mousse de lavanda e Mirtilo','Mousse de lavanda sobre compota de mirtilo e base crocante. Aveludado e sofisticado.',30.00,100,'/uploads/produtos/produto-1787885480492.jpg',3,1,1,0,1),(39,'Cúpula de Frutas Vermelhas','Base sablée, mousse de frutas vermelhas e cúpula de gelatina com flores e ouro. Leve, floral e refrescante.',28.00,100,'/uploads/produtos/produto-1787885526867.jpg',3,1,1,0,1),(40,'Taça Chocolate Morango','Base crocante de chocolate, mousse aveludado e morango com calda vibrante, finalizado com chocolate e ouro.',25.00,100,'/uploads/produtos/produto-1787885565291.jpg',3,1,1,0,1),(41,'Chocolate Quente','Chocolate quente rico e cremoso, coroado com chantilly aveludado e uma cascata de ganache. Intenso e reconfortante, é o refúgio perfeito para os dias frios.',16.00,100,'/uploads/produtos/produto-1787885620998.jpg',3,1,1,0,1),(42,'Latte Caramelizado','Espresso intenso, leite vaporizado e caramelo em swirl perfeito, finalizado com arte de leite.',15.00,100,'/uploads/produtos/produto-1787885699365.jpg',1,1,1,0,1),(43,'Supremo Gelado','Café gelado intenso com chantilly, calda de chocolate e sprinkles. Refrescante e indulgente.',18.00,100,'/uploads/produtos/produto-1787885735227.jpg',1,1,1,0,1),(44,'Cappuccino Artesanal','Espresso encorpado com leite vaporizado, finalizado com canela, cacau e especiarias aromáticas',15.00,100,'/uploads/produtos/produto-1787885808375.jpg',1,1,1,0,1),(51,'cafe teste','cafe teste',5.00,2,'',1,1,1,0,0);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recuperacao_senha`
--

DROP TABLE IF EXISTS `recuperacao_senha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recuperacao_senha` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `codigo` varchar(6) NOT NULL,
  `expiracao` datetime NOT NULL,
  `usado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `recuperacao_senha_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recuperacao_senha`
--

LOCK TABLES `recuperacao_senha` WRITE;
/*!40000 ALTER TABLE `recuperacao_senha` DISABLE KEYS */;
/*!40000 ALTER TABLE `recuperacao_senha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `role` enum('admin','cliente') DEFAULT 'cliente',
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Administrador','gscoffee.contato@gmail.com','$2b$10$yd7f8DOny3YzlUV6ee9L4.ogl6svc3Mcu2wxhanI18DSHJ5diWtG.','(11) 94002-8922','11222333000181',NULL,'admin','2026-08-28 02:12:20'),(2,'Iara Silva','iara.teste@gscoffee.com','$2b$10$UIEEI3aXg3XmFMf3tyKxO.Q4s6XQagN3SydBXmSWuOM8AC43qtufO','(11) 99999-9999','52998224725','2000-10-02','cliente','2026-08-28 03:02:57'),(4,'Camila Guimarães','camila.teste@gscoffee.com','$2b$10$RVDAD2ZQxud35hzXnSiaJOH5o4upjjadA5Zq3gt63IEn6pq9BEM4a','(11) 99999-9999','11144477735','2002-02-02','cliente','2026-08-31 22:39:50');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-01 17:28:57
