import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import Funcionario from '../app/models/Funcionario';
import Departamento from '../app/models/Departamento';

const models = [Funcionario, Departamento];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dbConfig);

        models.map(model => model.init(this.connection));
        models.map(
            model => model.associate && model.associate(this.connection.models)
        );
        // Removendo campo ID Inserido pelo Sequelize
        models.map(model => model.removeAttribute('id'));
    }
}

export default new Database();
