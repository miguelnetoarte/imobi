import tables from './tables';
const doc = `https://github.com/miguenetoarte/imobi`;

const validator = function (options: any) {
    if (!options) throw Error(`
    object options doesn't found 
    \nsee the example: \n
    imobi.calculator({
        "table": "SAC",
        "financedAmount": 150000,
        "deadline": 360,
        "annualTaxRate": 0.72,
        "admTaxesRate": 25,
        "gracePeriod": 6,
        "firstInstallmentDue": new Date(),
        "insurence": {
            "estateValue": 200000, 
            "mipTaxesRate": 0.0001737,
            "dfiTaxesRate": 0.0001503,
        },
        "expenses": 0
    })
    or you can read documentation in ${doc}\n\n`);
    if (!tables[options.table.toLocaleUpperCase()]) throw Error(`table value not found or not exists, available tables: SAC, PRICE\n\n`)
    if (!options.financedAmount || options.financedAmount === 0) throw Error(`param financedAmount not found or 0 in options\n\n`);
    if (!options.deadline) throw Error(`param deadline not found in options\n\n`);
    if (!options.annualTaxRate) throw Error(`param annualTaxRate not found in options\n\n`);
    if (Number(options.gracePeriod) >=  Number(options.deadline)) throw Error(`param gracePeriod not excepted, look at deadline\n\n`);
    options.expenses = options.expenses ? Number(options.expenses) : 0;
    options.financedAmount = Number(options.financedAmount);
    options.deadline = Number(options.deadline);
    options.annualTaxRate = Number(options.annualTaxRate);
    options.admTaxesRate = options.admTaxesRate ? Number(options.admTaxesRate) : 0;

    options.insurence = !!options.insurence ? options.insurence : {};
    options.insurence.mipTaxesRate = !!options.insurence.mipTaxesRate ? Number(options.insurence.mipTaxesRate) : 0;
    options.insurence.dfiTaxesRate = !!options.insurence.dfiTaxesRate ? Number(options.insurence.dfiTaxesRate) : 0;
    options.insurence.estateValue = !!options.insurence.estateValue ? Number(options.insurence.estateValue) : 0;
    options.gracePeriod = !!options.gracePeriod ? Number(options.gracePeriod) : 0;
    options.firstInstallmentDue = !!options.firstInstallmentDue && options.firstInstallmentDue instanceof Date ? options.firstInstallmentDue : null;

    return options;
}

export = validator;