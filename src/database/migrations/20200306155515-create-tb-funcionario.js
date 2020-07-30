module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tb_funcionario', {
            cpf_func: {
                type: Sequelize.STRING,
                autoIncrement: false,
                primaryKey: true,
                unique: true,
            },
            // RG
            nm_func: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // nm Parentes
            // Cidade
            // Endereço
            // CEP
            // E-mail
            // Cargo
            sl_func: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            dt_nasc_func: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            dt_adm_func: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: new Date(),
            },
            // dt_saida_func
            // Motivo
            // Tamanho_unif
            // Título_de_eleitor/zona/seção
            // N° CTPS/série
            // CNPJ_MEI
            // Senha_MEI
            // Nire
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
        return queryInterface.dropTable('tb_funcionario');
    },
};
