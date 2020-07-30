import * as Yup from 'yup';

import Departamento from '../models/Departamento';

class DepartamentoController {
    async index(req, resp) {
        const { codigo } = req.query;
        if (!codigo) {
            const deptos = await Departamento.findAll({
                order: ['cd_depto'],
                attributes: [
                    ['cd_depto', 'codigo'],
                    ['nm_depto', 'nome'],
                ],
            });
            return resp.json({
                departamentos: deptos,
            });
        }
        const depto = await Departamento.findOne({
            where: { cd_depto: codigo },
            attributes: [
                ['cd_depto', 'codigo'],
                ['nm_depto', 'nome'],
            ],
        });
        return resp.json(depto);
    }

    async store(req, resp) {
        const schema = Yup.object().shape({
            nome: Yup.string('Digite o nome do Departamento.').required(
                'Nome do Departamento é obrigatório.'
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return resp.status(400).json({ erro: 'Erro de validação' });
        }

        const { nome } = req.body;
        const nomeUpper = nome.toUpperCase();

        const depto = await Departamento.findOne({
            where: {
                nm_depto: nomeUpper,
            },
        });

        if (depto)
            return resp
                .status(400)
                .json({ erro: 'Já existe um departamento com este nome.' });

        const createdDepto = await Departamento.create({
            nm_depto: nomeUpper,
        });

        const { nm_depto, cd_depto } = createdDepto.dataValues;

        return resp.json({
            departamento: {
                codigo: cd_depto,
                nome: nm_depto,
            },
        });
    }
}
export default new DepartamentoController();
