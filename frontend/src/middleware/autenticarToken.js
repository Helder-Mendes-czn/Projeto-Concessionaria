import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function autenticarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ mensagem: "Token não informado" });
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (erro, decoded) => {
        if (erro) return res.status(401).json({ mensagem: "Token inválido" });

        req.usuario = decoded;
        next();
    });
}

export default autenticarToken;