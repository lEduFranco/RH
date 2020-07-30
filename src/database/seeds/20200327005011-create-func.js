module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'tb_funcionario',
            [
                {
                    cpf_func: '12345678910',
                    nm_func: 'adimin',
                    sl_func: 999,
                    dt_nasc_func: '2020-02-20',
                    dt_adm_func: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                    cd_depto: 1,
                },
            ],
            {}
        );
    },

    down: () => {},
};
