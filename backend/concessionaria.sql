CREATE DATABASE IF NOT EXISTS concessionaria;
USE concessionaria;

CREATE TABLE IF NOT EXISTS usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40),
    usuario VARCHAR(45) UNIQUE,
	email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    status ENUM('ativo','inativo') DEFAULT 'ativo',
    tipo ENUM('Usuário Comum','Usuário Vendedor'),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    telefone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS moto(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_usuario INT NOT NULL,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    ano VARCHAR(255),
    estilo VARCHAR(255),
    cilindrada VARCHAR(255),
    motor VARCHAR(255),
    potencia VARCHAR(255),
    torque VARCHAR(255),
    taxa_compressao VARCHAR(255),
    diametro_curso VARCHAR(255),
    valvulas_por_cilindro INT,
    alimentacao VARCHAR(255),
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
    partida VARCHAR(255),
    ano_modelo VARCHAR(255),
    ano_fabricacao VARCHAR(255),
    cor_principal VARCHAR(255),
    cor_secundaria VARCHAR(255),
    quilometragem VARCHAR(255),
    freios VARCHAR(255),
    status ENUM('disponível','vendida','em revisão') DEFAULT 'disponível',
    CONSTRAINT moto_fk_vendedor FOREIGN KEY (id_usuario) REFERENCES usuario(id)
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
	CONSTRAINT anuncio_fk_moto FOREIGN KEY (id_moto) REFERENCES moto(id) ON DELETE CASCADE
);

CREATE TABLE garagem(
	id_usuario INT,
    id_anuncio INT,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT garagem_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	CONSTRAINT garagem_fk_moto FOREIGN KEY (id_anuncio) REFERENCES anuncio(id) ON DELETE CASCADE,
    PRIMARY KEY (id_usuario, id_anuncio)
);

CREATE TABLE IF NOT EXISTS pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_comprador INT,
    id_vendedor INT,
    id_anuncio INT,
    valor DECIMAL(10,2),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente','pago','cancelado') DEFAULT 'pendente',
    CONSTRAINT pedido_fk_comprador FOREIGN KEY (id_comprador) REFERENCES usuario(id),
    CONSTRAINT pedido_fk_vendedor FOREIGN KEY (id_vendedor) REFERENCES usuario(id),
    CONSTRAINT pedido_fk_moto FOREIGN KEY (id_anuncio) REFERENCES anuncio(id)
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
    valor_original TEXT NOT NULL, 
    idioma VARCHAR(10) NOT NULL,         
    valor_traduzido TEXT NOT NULL NOT NULL
);

CREATE TABLE IF NOT EXISTS moto_imagens(
	id INT PRIMARY KEY AUTO_INCREMENT,
	id_moto INT,
	imagem VARCHAR(255),
	FOREIGN KEY (id_moto) REFERENCES moto(id)
);