import Sequelize, { Model } from 'sequelize';

class Departamento extends Model {
    static init(sequelize) {
        super.init(
            {
                cd_depto: Sequelize.BIGINT,
                nm_depto: Sequelize.STRING,
            },
            {
                tableName: 'tb_departamento',
                modelName: 'Departamento',
                freezeTableName: true,
                sequelize,
            }
        );
    }
}

export default Departamento;
