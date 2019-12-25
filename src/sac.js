const formatValue = require('./formatValue');

const calcDebitBalance = function(currentInstallmentNumber, financedValue, amortization){
    return financedValue - (currentInstallmentNumber * amortization);
}

const calcInterestRate = function(debitBalance, amortization, annualTaxRate){
    return (debitBalance + amortization) * (annualTaxRate/12)/100;
}

const sac = function(options) {
    const { 
        financedAmount, 
        expenses, 
        deadline, 
        annualTaxRate 
    } = options;

    let installments = {};
    let financedValue = financedAmount + expenses;
    let amortization = financedValue / deadline;
    let installmentsTotal = 0;
    let amortizationTotal = 0;
    let interestRateTotal = 0;
    let summary = {};

    for (let index = 1; index <= deadline; index++) {

        let debitBalance = calcDebitBalance(index, financedValue, amortization);
        let interestRate = calcInterestRate(debitBalance, amortization, annualTaxRate);

        installments = {
            ...installments,
            [index]: {
                installment: index,
                amortization: formatValue(amortization, 2),
                interestRate: formatValue(interestRate, 2),
                installmentValue: formatValue(amortization + interestRate, 2),
                debitBalance: formatValue(debitBalance, 2)
            }
        }

        summary = {
            installments,
            installmentsTotal,
            amortizationTotal,
            interestRateTotal
        }

    }
    return summary;
}

module.exports = sac;