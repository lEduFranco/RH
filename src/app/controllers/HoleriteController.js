import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Funcionario from '../models/Funcionario';
import Departamento from '../models/Departamento';

class HoleriteController {
    async index(req, resp) {
        const schema = Yup.object().shape({
            cpf: Yup.string('Formato de CPF inválido')
                .length(11, 'CPF deve ter 11 digitos.')
                .required('O campo de CPF é obrigatório.'),
        });

        if (!(await schema.isValid(req.params))) {
            return resp.status(400).json({ erro: 'Erro de validação: CPF.' });
        }

        const { cpf } = req.params;

        // Recuperando dados do Usuário
        const checkFunc = await Funcionario.findOne({
            where: { cpf_func: cpf },
        });
        if (!checkFunc)
            return resp
                .status(404)
                .json({ erro: 'Funcionário não encontrado.' });
        const {
            nm_func: nome,
            sl_func: salario,
            dt_nasc_func: data_nascimento,
            dt_adm_func: data_admissao,
            cd_depto: departamento,
        } = checkFunc;

        // Recuperando dados do departamento
        const { nm_depto } = await Departamento.findOne({
            where: { cd_depto: departamento },
        });

        // Calculando INSS
        let aliquota = 1;
        if (salario === 1045) aliquota = 0.075;
        if (salario >= 1045.01 && salario <= 2089.6) aliquota = 0.09;
        if (salario >= 2089.61 && salario <= 3134.4) aliquota = 0.12;
        if (salario >= 3134.41 && salario <= 6101.06) aliquota = 0.14;
        if (salario >= 6101.07) aliquota = 0.15;
        const INSS = salario * aliquota;

        // Calculando total Liquido
        const plano_saude = 350.0;
        const transporte = salario * 0.06;
        const hora_extra = 0;
        const total_liquido =
            salario - transporte - plano_saude - INSS + hora_extra;
        const total_descontos = transporte + plano_saude + INSS;
        const data_referente = format(new Date(), "MMMM 'de' yyyy", {
            locale: pt,
        });

        return resp.json({
            holerite: {
                funcionario: {
                    cpf,
                    nome,
                    salario_fixo: salario,
                    data_nascimento,
                    data_admissao,
                    departamento: {
                        nome: nm_depto,
                    },
                },
                info_descontos: {
                    INSS,
                    plano_saude,
                    transporte,
                    hora_extra,
                    total_descontos,
                    total_liquido,
                    data_referente,
                },
            },
        });
    }
}
export default new HoleriteController();
