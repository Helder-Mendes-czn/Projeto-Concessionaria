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

drop table garagem;
CREATE TABLE garagem(
	id_usuario INT,
    id_anuncio INT,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT garagem_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	CONSTRAINT garagem_fk_moto FOREIGN KEY (id_anuncio) REFERENCES anuncio(id),
    PRIMARY KEY (id_usuario, id_anuncio)
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
    id_anuncio INT,
    conteudo TEXT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT msg_fk_remetente FOREIGN KEY (id_remetente) REFERENCES usuario(id),
    CONSTRAINT msg_fk_destinatario FOREIGN KEY (id_destinatario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS traducao_moto(
    id INT AUTO_INCREMENT PRIMARY KEY,
    campo VARCHAR(255) NOT NULL,         
    valor_original VARCHAR(255) NOT NULL, 
    idioma VARCHAR(10) NOT NULL,         
    valor_traduzido VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS moto_imagens(
	id INT PRIMARY KEY AUTO_INCREMENT,
	id_moto INT,
	imagem VARCHAR(255),
	FOREIGN KEY (id_moto) REFERENCES moto(id)
);
SELECT imagem FROM moto_imagens WHERE id_moto = 1201;
SELECT a.id AS id_anuncio, mi.imagem, a.preco, a.localizacao, m.ano, m.ano_fabricacao, m.ano_modelo, m.marca, m.modelo, m.quilometragem FROM garagem g JOIN anuncio a ON g.id_anuncio = a.id JOIN moto m ON m.id = a.id_moto JOIN moto_imagens mi ON m.id = mi.id_moto WHERE g.id_usuario = 7;

ALTER TABLE traducao_moto MODIFY valor_original TEXT NOT NULL;
ALTER TABLE traducao_moto MODIFY valor_traduzido TEXT NOT NULL;

ALTER TABLE usuario
ADD COLUMN email VARCHAR(100) UNIQUE,
ADD COLUMN telefone VARCHAR(20),
MODIFY COLUMN senha VARCHAR(255),
ADD COLUMN data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN status ENUM('ativo','inativo') DEFAULT 'ativo';
ALTER TABLE usuario ADD COLUMN vasco INT;
ALTER TABLE usuario drop COLUMN vasco;
ALTER TABLE moto
ADD COLUMN imagem_principal VARCHAR(255),
ADD COLUMN status ENUM('disponível','vendida','em revisão') DEFAULT 'disponível',
ADD CONSTRAINT moto_fk_vendedor FOREIGN KEY (id_vendedor) REFERENCES usuario(id);
ALTER TABLE moto ADD COLUMN quilometragem VARCHAR(255);
alter table moto add column ano_fabricacao VARCHAR(255), ADD column ano_modelo VARCHAR(255);
ALTER TABLE moto RENAME COLUMN tipo TO estilo;
ALTER TABLE moto RENAME COLUMN sistema_combustivel TO alimentacao;
ALTER TABLE moto RENAME COLUMN id_vendedor TO id_usuario;
ALTER TABLE moto ADD COLUMN cor_principal VARCHAR(255), ADD COLUMN cor_secundaria VARCHAR(255);
ALTER TABLE moto ADD column freios VARCHAR(255);
ALTER TABLE anuncio
DROP FOREIGN KEY anuncio_fk_moto;

-- 2. Adiciona a nova chave estrangeira com ON DELETE CASCADE
ALTER TABLE anuncio
ADD CONSTRAINT anuncio_fk_moto
FOREIGN KEY (id_moto)
REFERENCES moto(id)
ON DELETE CASCADE;

-- 1. Remove a chave estrangeira existente (sem CASCADE)
ALTER TABLE garagem
DROP FOREIGN KEY garagem_fk_moto;

-- 2. Adiciona a nova chave estrangeira com ON DELETE CASCADE
ALTER TABLE garagem
ADD CONSTRAINT garagem_fk_moto
FOREIGN KEY (id_anuncio)
REFERENCES anuncio(id)
ON DELETE CASCADE;

SELECT a.id AS id_anuncio, m.id AS id_moto, a.preco, a.localizacao, m.ano, m.ano_fabricacao, m.ano_modelo, m.marca, m.modelo, m.quilometragem FROM anuncio a JOIN moto m ON a.id_moto = m.id ORDER BY a.data_publicacao DESC;
DESCRIBE moto;
SHOW COLUMNS FROM moto;
SHOW COLUMNS FROM anuncio;
SHOW COLUMNS FROM usuario;
select * from anuncio;
select distinct refrigeracao from moto;
select * from garagem;
select * from anuncio a join garagem g on a.id = g.id_anuncio;
delete from garagem where id_anuncio = 2;
select * from moto where id = 1201;
select imagem from moto_imagens where id_moto = 1201;
select * from usuario where id = 7;
select distinct estilo from moto;
delete from anuncio where id = 1;
SELECT DISTINCT * FROM usuario;
SELECT id, modelo, marca, ano FROM moto WHERE marca LIKE "yamaha";
SELECT id, CONCAT('[', motor, ']') AS motor FROM moto;
SELECT a.id AS id_anuncio, a.preco, a.localizacao, m.ano, m.ano_fabricacao, m.ano_modelo, m.marca, m.modelo, m.quilometragem FROM GARAGEM g JOIN anuncio a ON g.id_anuncio = a.id JOIN moto m ON m.id = a.id_moto WHERE g.id_usuario = u.id;
SELECT a.id AS id_anuncio, m.id AS id_moto, a.preco, a.localizacao, m.ano, m.ano_fabricacao, m.ano_modelo, m.marca, m.modelo, m.quilometragem FROM garagem g LEFT JOIN anuncio a ON g.id_anuncio = a.id JOIN moto m ON m.id = a.id_moto WHERE g.id_usuario = 7;
SELECT a.id AS id_anuncio, m.id AS id_moto, a.preco, a.localizacao, m.ano, m.ano_fabricacao, m.ano_modelo, m.marca, m.modelo, m.quilometragem FROM anuncio a JOIN usuario u ON a.id_usuario = u.id JOIN moto m ON a.id_moto = m.id ORDER BY a.data_publicacao DESC; 


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

