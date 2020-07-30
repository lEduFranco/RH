module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('tb_funcionario', 'cd_depto', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'tb_departamento', key: 'cd_depto' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('tb_funcionario', 'cd_depto');
    },
};
