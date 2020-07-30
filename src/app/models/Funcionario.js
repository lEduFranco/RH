import Sequelize, { Model } from 'sequelize';

class Funcionario extends Model {
    static init(sequelize) {
        super.init(
            {
                cpf_func: Sequelize.STRING,
                nm_func: Sequelize.STRING,
                sl_func: Sequelize.DOUBLE,
                dt_nasc_func: Sequelize.DATEONLY,
                dt_adm_func: Sequelize.DATEONLY,
                cd_depto: Sequelize.BIGINT,
            },
            {
                tableName: 'tb_funcionario',
                modelName: 'Funcionario',
                freezeTableName: true,
                sequelize,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Departamento, {
            foreignKey: 'cd_depto',
            targetKey: 'cd_depto',
            as: 'departamento',
        });
    }
}

export default Funcionario;
