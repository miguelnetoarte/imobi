const tables = require('./tables');
const doc = `https://github.com/miguenetoarte/imobi`;

const validator = function(options) {
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
    if (!options.financedAmount) throw Error(`param financedAmount not found in options\n\n`);
    if (!options.deadline) throw Error(`param deadline not found in options\n\n`);
    if (!options.annualTaxRate) throw Error(`param annualTaxRate not found in options\n\n`);
    
    return true;
}

module.exports = validator;