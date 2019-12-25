
const calculator = (options) => {
    if (!options) throw Error(`
    object options doesn't found 
    \nsee the example: \n
    imobi.calculator({
        "table": "SAC",
        "financedAmount": 200000,
        "deadline": 360,
        "annualTaxRate": 7.7
        "expenses": 0
    })`);

    return options;
}

module.exports = calculator;