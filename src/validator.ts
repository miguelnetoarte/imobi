import tables from './tables';
const doc = `https://github.com/miguenetoarte/imobi`;

const validator = function(options: any) {
    if (!options) throw Error(`
    object options doesn't found 
    \nsee the example: \n
    imobi.calculator({
        "table": "SAC",
        "financedAmount": 200000,
        "deadline": 360,
        "annualTaxRate": 7.7,
        "expenses": 0
    })
    or you can read documentation in ${doc}\n\n`);
    if (!tables[options.table.toLocaleUpperCase()]) throw Error(`table value not found or not exists, available tables: SAC, PRICE\n\n`)
    if (!options.financedAmount || options.financedAmount === 0) throw Error(`param financedAmount not found or 0 in options\n\n`);
    if (!options.deadline) throw Error(`param deadline not found in options\n\n`);
    if (!options.annualTaxRate) throw Error(`param annualTaxRate not found in options\n\n`);
    options.expenses = options.expenses ? options.expenses : 0;
    options.financedAmount = Number(options.financedAmount);
    options.deadline = Number(options.deadline);
    options.annualTaxRate = Number(options.annualTaxRate);
    return options;
}

export = validator;