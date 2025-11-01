CREATE DATABASE IF NOT EXISTS concessionaria;
USE concessionaria;

CREATE TABLE IF NOT EXISTS usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40),
    usuario VARCHAR(45) UNIQUE,
    senha VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS moto(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_vendedor INT,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    ano VARCHAR(255),
    tipo VARCHAR(255),
    cilindrada VARCHAR(255),
    motor VARCHAR(255),
    potencia VARCHAR(255),
    torque VARCHAR(255),
    taxa_compressao VARCHAR(255),
    diametro_curso VARCHAR(255),
    valvulas_por_cilindro INT,
    sistema_combustivel VARCHAR(255),
    comando_combustivel VARCHAR(255),
    ignicao VARCHAR(255),
    lubrificacao VARCHAR(255),
    refrigeracao VARCHAR(255),
    caixa_marchas VARCHAR(255),
    transmissao VARCHAR(255),
    embreagem VARCHAR(255),
    quadro VARCHAR(255),
    suspensao_dianteira VARCHAR(255),
    curso_roda_dianteira VARCHAR(255),
    suspensao_traseira VARCHAR(255),
    curso_roda_traseira VARCHAR(255),
    pneu_dianteiro VARCHAR(255),
    pneu_traseiro VARCHAR(255),
    freios_dianteiros VARCHAR(255),
    freios_traseiros VARCHAR(255),
    peso_total VARCHAR(255),
    altura_assento VARCHAR(255),
    altura_total VARCHAR(255),
    comprimento_total VARCHAR(255),
    largura_total VARCHAR(255),
    distancia_solo VARCHAR(255),
    entre_eixos VARCHAR(255),
    capacidade_combustivel VARCHAR(255),
    partida VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS anuncio(
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT,
    id_moto INT,
    preco DECIMAL(10,2),
    localizacao VARCHAR(255),
    descricao TEXT,
    data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo','inativo') DEFAULT 'ativo',
    CONSTRAINT anuncio_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT anuncio_unico UNIQUE (id_usuario, id_moto),
	CONSTRAINT anuncio_fk_moto FOREIGN KEY (id_moto) REFERENCES moto(id)
);

CREATE TABLE garagem(
	id_usuario INT,
    id_moto INT,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT garagem_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	CONSTRAINT garagem_fk_moto FOREIGN KEY (id_moto) REFERENCES moto(id),
    PRIMARY KEY (id_usuario, id_moto)
);

CREATE TABLE IF NOT EXISTS pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_comprador INT,
    id_vendedor INT,
    id_moto INT,
    valor DECIMAL(10,2),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente','pago','cancelado') DEFAULT 'pendente',
    CONSTRAINT pedido_fk_comprador FOREIGN KEY (id_comprador) REFERENCES usuario(id),
    CONSTRAINT pedido_fk_vendedor FOREIGN KEY (id_vendedor) REFERENCES usuario(id),
    CONSTRAINT pedido_fk_moto FOREIGN KEY (id_moto) REFERENCES moto(id)
);

CREATE TABLE IF NOT EXISTS mensagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_remetente INT,
    id_destinatario INT,
    conteudo TEXT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT msg_fk_remetente FOREIGN KEY (id_remetente) REFERENCES usuario(id),
    CONSTRAINT msg_fk_destinatario FOREIGN KEY (id_destinatario) REFERENCES usuario(id)
);

#ALTER TABLE usuario ADD COLUMN tipo VARCHAR(40) CHECK (tipo IN ('Usuário Vendedor','Usuário Comum'));

ALTER TABLE usuario
ADD COLUMN email VARCHAR(100) UNIQUE,
ADD COLUMN telefone VARCHAR(20),
MODIFY COLUMN senha VARCHAR(255),
ADD COLUMN data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN status ENUM('ativo','inativo') DEFAULT 'ativo';

ALTER TABLE moto
ADD COLUMN imagem_principal VARCHAR(255),
ADD COLUMN status ENUM('disponível','vendida','em revisão') DEFAULT 'disponível',
ADD CONSTRAINT moto_fk_vendedor FOREIGN KEY (id_vendedor) REFERENCES usuario(id);

SELECT id, usuario, senha FROM usuario;

UPDATE moto SET imagem_principal = 'https://www.autoevolution.com/images/moto_gallery/APRILIA-SMV-900-DORSODURO-14281_2.jpg' WHERE id = 1;
UPDATE moto SET imagem_principal = 'https://cdn.motochecker.at/motorrad/aprilia-rs-125-2022-0.png' WHERE id =2;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://wlassets.aprilia.com/wlassets/aprilia/master/Range/RS660/models_page/gallery/Aprilia_RS660-RacingBlack_Gallery_1920x1080_3/original/Aprilia_RS660-RacingBlack_Gallery_1920x1080_3.jpg?1673348927272' WHERE id = 4;
UPDATE moto SET imagem_principal = 'https://www.motofichas.com/images/phocagallery/Aprilia/rs-660-2020/17-aprilia-rs-660-limited-edition-motoamerica-2022-estudio.jpg' WHERE id = 5;
UPDATE moto SET imagem_principal = 'https://images5.1000ps.net/images_bikekat/2022/9-Aprilia/9956-RS_660/030-637771535076669759-aprilia-rs-660.jpg' WHERE id = 6;
UPDATE moto SET imagem_principal = 'https://images.piaggio.com/aprilia/vehicles/ap6161r03ecr00/ap6161r03ecrba/ap6161r03ecrba-01-m.png' WHERE id = 7;
UPDATE moto SET imagem_principal = 'https://images.piaggio.com/aprilia/vehicles/ap6153s00ecs00/ap6153s00ecsv1/ap6153s00ecsv1-01-s.png' WHERE id = 8;
UPDATE moto SET imagem_principal = 'https://bikez.com/pictures/aprilia/2022/57380_0_1_4_rx%2050%20factory_Image%20credits%20-%20Aprilia.jpg' WHERE id = 9;
UPDATE moto SET imagem_principal = 'https://www.motofichas.com/images/cache/01-aprilia-sr-gt-2022-estudio-gris-739-a.jpg' WHERE id = 10;
UPDATE moto SET imagem_principal = 'https://paultan.org/image/2022/03/2022-Aprilia-SR-GT-200-2-e1646641108238.jpg' WHERE id = 11;
UPDATE moto SET imagem_principal = 'https://images5.1000ps.net/images_bikekat/2022/9-Aprilia/3754-SX_125_Supermoto/015-638012683748222087-aprilia-sx-125-supermoto.jpg' WHERE id = 12;
UPDATE moto SET imagem_principal = 'https://www.motofichas.com/images/phocagallery/Aprilia/sx-50-2018/08-aprilia-sx-50-2018-perfil.jpg' WHERE id = 13;
UPDATE moto SET imagem_principal = 'https://www.motofichas.com/images/phocagallery/Aprilia/sx-50-2018/08-aprilia-sx-50-2018-perfil.jpg' WHERE id = 14;
UPDATE moto SET imagem_principal = 'https://put.edidomus.it/dueruote/nuovo/850/lat-scarabeo50.jpg' WHERE id = 15;
UPDATE moto SET imagem_principal = 'https://storage.edidomus.it/dueruote/nuovo/850/00001363.JPG' WHERE id = 16;
UPDATE moto SET imagem_principal = 'https://as.sobrenet.pt/s/image/tsr/brandm/product/1920x1280/oazxwuoojeucz14to4et2tvxaq2.jpg' WHERE id = 17;
UPDATE moto SET imagem_principal = 'https://s1.cdn.autoevolution.com/images/moto_gallery/APRILIA-SHIVER-900-13865_1.jpg' WHERE id = 18;
UPDATE moto SET imagem_principal = 'https://soymotero.net/wp-content/uploads/2025/01/20251157593678726.jpg' WHERE id = 19;
UPDATE moto SET imagem_principal = 'https://cdn.motochecker.at/motorrad/aprilia-tuareg-660-2022-2.jpg' WHERE id = 20;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;
UPDATE moto SET imagem_principal = 'https://www.motoplanete.com/aprilia/galerie/Aprilia-RS-125-2025-GP-Replica/10.webp' WHERE id = 3;

