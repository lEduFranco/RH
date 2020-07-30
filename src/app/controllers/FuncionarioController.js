import * as Yup from 'yup';

import Funcionario from '../models/Funcionario';
import Departamento from '../models/Departamento';

class FuncionarioController {
    async index(req, resp) {
        const schema = Yup.object().shape({
            cpf: Yup.string('Formato de CPF inválido').length(
                11,
                'CPF deve ter 11 digitos.'
            ),
            page: Yup.number('Formato de paginação incorreta')
                .moreThan(0, 'Paginação deve ser maior que 0.')
                .required('Paginação é obrigatório'),
        });

        if (!(await schema.isValid(req.query)))
            return resp.status(404).json({ erro: 'Erro de validação.' });

        const { cpf, page } = req.query;
        if (!cpf) {
            const funcionarios = await Funcionario.findAll({
                order: ['cd_depto'],
                offset: (page - 1) * 10,
                attributes: [
                    ['cpf_func', 'cpf'],
                    ['nm_func', 'nome'],
                    ['sl_func', 'salario'],
                    ['dt_nasc_func', 'data_nascimento'],
                    ['dt_adm_func', 'data_admissao'],
                ],
                include: [
                    {
                        model: Departamento,
                        as: 'departamento',
                        attributes: [['nm_depto', 'nome']],
                    },
                ],
            });
            return resp.json({ funcionarios });
        }
        const funcionario = await Funcionario.findOne({
            where: { cpf_func: cpf },
            attributes: [
                ['cpf_func', 'cpf'],
                ['nm_func', 'nome'],
                ['sl_func', 'salario'],
                ['dt_nasc_func', 'data_nascimento'],
                ['dt_adm_func', 'data_admissao'],
            ],
            include: [
                {
                    model: Departamento,
                    as: 'departamento',
                    attributes: [['nm_depto', 'nome']],
                },
            ],
        });

        if (!funcionario)
            return resp
                .status(404)
                .json({ erro: 'Funcionário não encontrado.' });

        return resp.json({ funcionario });
    }

    async store(req, resp) {
        const schema = Yup.object().shape({
            cpf: Yup.string('Formato de CPF inválido')
                .length(11, 'CPF deve ter 11 digitos.')
                .required('O campo de CPF é obrigatório.'),
            nome: Yup.string('Formato de nome inválido').required(
                'O campo de nome é obrigatório.'
            ),
            salario: Yup.number('Formato de salário inválido.')
                .required('O campo de salário é obrigatório.')
                .positive('Formato de salário inválido.')
                .moreThan(0, 'Salário deve ser maior que 0.'),
            data_nascimento: Yup.date(
                'Formato de data de nascimento inválido.'
            ).required('O campo de data de nascimento é obrigatório.'),
            departamento: Yup.number()
                .integer('Código de departamento inválido.')
                .positive('Código de departamento deve ser positivo.'),
        });
        if (!(await schema.isValid(req.body))) {
            return resp.status(400).json({ erro: 'Erro de validação.' });
        }

        const {
            cpf,
            nome,
            salario,
            data_nascimento,
            departamento: codigo,
        } = req.body;

        const checkDepto = await Departamento.findOne({
            where: { cd_depto: codigo },
        });

        if (!checkDepto) {
            return resp
                .status(400)
                .json({ erro: 'Departamento não encontrado.' });
        }

        const funcionario = await Funcionario.findOne({
            where: { cpf_func: cpf },
            attributes: ['cpf_func'],
        });

        if (funcionario) {
            return resp
                .status(400)
                .json({ erro: 'Funcionário já cadastrado com este CPF.' });
        }

        await Funcionario.create({
            cpf_func: cpf,
            nm_func: nome,
            sl_func: salario,
            dt_nasc_func: data_nascimento,
            cd_depto: codigo,
        });

        return resp.json({
            funcionario: {
                cpf,
                nome,
                salario,
                data_nascimento,
                departamento: {
                    nome: checkDepto.nm_depto,
                },
            },
        });
    }
}

export default new FuncionarioController();
