import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, resp, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return resp.status(401).json({ erro: 'Token não encontrado.' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.funcId = decoded.cpf;
        return next();
    } catch (err) {
        return resp.status(401).json({ erro: 'Token inválido.' });
    }
};
