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

CREATE TABLE anuncio(
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
    PRIMARY KEY (id_vendedor, id_moto)
);

CREATE TABLE pedido (
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

CREATE TABLE mensagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_remetente INT,
    id_destinatario INT,
    conteudo TEXT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT msg_fk_remetente FOREIGN KEY (id_remetente) REFERENCES usuario(id),
    CONSTRAINT msg_fk_destinatario FOREIGN KEY (id_destinatario) REFERENCES usuario(id)
);


ALTER TABLE usuario ADD COLUMN tipo VARCHAR(40) CHECK (tipo IN ('Usuário Vendedor','Usuário Comum'));

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

