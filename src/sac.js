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
        let interestRate = formatValue(calcInterestRate(debitBalance, amortization, annualTaxRate),2);
        let installmentValue = formatValue(formatValue(amortization, 2) + interestRate, 2);
        let amortizationResult = formatValue(amortization, 2);
        installmentsTotal = formatValue(installmentsTotal + installmentValue, 2);
        amortizationTotal = formatValue(amortizationTotal + amortizationResult, 2);
        interestRateTotal = formatValue(interestRateTotal + interestRate, 2);


        installments = {
            ...installments,
            [index]: {
                installment: index,
                amortization: amortizationResult,
                interestRate: interestRate,
                installmentValue: installmentValue,
                debitBalance: formatValue(debitBalance, 2)
            }
        }

        summary = {
            installments, 
            deadline,
            installmentsTotal,
            amortizationTotal,
            interestRateTotal
        }
    }

    return summary;
}

module.exports = sac;