module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'tb_departamento',
            [
                {
                    nm_depto: 'RECURSOS HUMANOS',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nm_depto: 'TECNOLOGIA DA INFORMAÇÃO',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    nm_depto: 'CONTABILIDADE',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
