module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tb_departamento', {
            cd_depto: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            nm_depto: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('tb_departamento');
    },
};
