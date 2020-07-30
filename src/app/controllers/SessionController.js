import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import Funcionario from '../models/Funcionario';
import Departamento from '../models/Departamento';

class SessionController {
    async store(req, resp) {
        const schema = Yup.object().shape({
            cpf: Yup.string('Formato de CPF inválido')
                .length(11, 'CPF deve ter 11 digitos.')
                .required('O campo de CPF é obrigatório.'),
            data_nascimento: Yup.date(
                'Formato de data de nascimento inválido.'
            ).required('O campo de data de nascimento é obrigatório.'),
        });

        if (!(await schema.isValid(req.body))) {
            return resp.status(400).json({ erro: 'Erro de validação.' });
        }

        const { cpf, data_nascimento } = req.body;
        const funcionario = await Funcionario.findOne({
            where: { cpf_func: cpf, dt_nasc_func: data_nascimento },
            include: [
                {
                    model: Departamento,
                    as: 'departamento',
                    where: { nm_depto: { [Op.like]: 'RECURSOS HUMANOS' } },
                },
            ],
        });
        if (!funcionario) {
            return resp
                .status(400)
                .json({ erro: 'Funcionário não permitido ou não encontrado.' });
        }

        const { nm_func: nome } = funcionario;
        return resp.json({
            funcionario: {
                cpf,
                nome,
            },
            token: jwt.sign({ cpf }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}
export default new SessionController();
