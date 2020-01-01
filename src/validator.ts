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
        "annualInterestRate": 0.72,
        "administrationTaxesRate": 25,
        "gracePeriod": 6,
        "firstInstallmentDue": new Date(),
        "insurence": {
            "estateValue": 200000, 
            "mipTaxRate": 0.0001737,
            "dfiTaxRate": 0.0001503,
        },
        "iof": {
            "ratePerDay": 0.0082,
            "additionalFee": 0.38
        },
        "expenses": 0
    })
    or you can read documentation in ${doc}\n\n`);
    if (!tables[options.table.toLocaleUpperCase()]) throw Error(`table value not found or not exists, available tables: SAC, PRICE\n\n`)
    if (!options.financedAmount || options.financedAmount === 0) throw Error(`param financedAmount not found or 0 in options\n\n`);
    if (!options.deadline) throw Error(`param deadline not found in options\n\n`);
    if (!options.annualInterestRate) throw Error(`param annualInterestRate not found in options\n\n`);
    if (Number(options.gracePeriod) >= Number(options.deadline)) throw Error(`param gracePeriod not excepted, look at deadline\n\n`);
    options.expenses = options.expenses ? Number(options.expenses) : 0;
    options.financedAmount = Number(options.financedAmount);
    options.deadline = Number(options.deadline);
    options.annualInterestRate = Number(options.annualInterestRate);
    options.administrationTaxesRate = options.administrationTaxesRate ? Number(options.administrationTaxesRate) : 0;

    options.insurence = !!options.insurence ? options.insurence : {};
    options.insurence.mipTaxRate = !!options.insurence.mipTaxRate ? Number(options.insurence.mipTaxRate) : 0;
    options.insurence.dfiTaxRate = !!options.insurence.dfiTaxRate ? Number(options.insurence.dfiTaxRate) : 0;
    options.insurence.estateValue = !!options.insurence.estateValue ? Number(options.insurence.estateValue) : 0;
    options.gracePeriod = !!options.gracePeriod ? Number(options.gracePeriod) : 0;
    options.firstInstallmentDue = !!options.firstInstallmentDue && options.firstInstallmentDue instanceof Date ? options.firstInstallmentDue : null;

    try {

        if (!!options.iof) {
            options.ratePerDay = !!options.ratePerDay ? options.ratePerDay : null;
            options.additionalFee = !!options.additionalFee ? options.additionalFee : null

        } else {
            options.iof = null;
        }
    } catch (e) {
        throw Error(`param iof is not object, look at example\n
        "iof": {
            "ratePerDay": 0.0082,
            "additionalFee": 0.38
        }`);
    }
    return options;
}

export = validator;