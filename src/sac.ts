import formatValue from './formatValue';
import insurenceCalc from './insurenceCalc';

const calcDebitBalance = function(currentInstallmentNumber:number, financedValue:number, amortization:number){
    return financedValue - (currentInstallmentNumber * amortization);
}

const calcInterestRate = function(debitBalance:number, amortization:number, annualTaxRate:number){
    return (debitBalance + amortization) * (annualTaxRate/12)/100;
}

const calcInstallment = function(amortization:number, interestRate:number, admTaxesRate:number, insurence:any) {
    console.log(admTaxesRate, insurence);
    return formatValue(formatValue(amortization, 2) + interestRate + admTaxesRate + insurence.insurenceValue, 2);
}

const sac = function(options:any) {
    const { 
        financedAmount, 
        expenses, 
        deadline, 
        annualTaxRate,
        admTaxesRate,
        insurence 
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
        let insurenceResult = insurenceCalc(debitBalance + amortization, insurence.estateValue, insurence.mipTaxesRate, insurence.dfiTaxesRate);
        let installmentValue = calcInstallment(amortization, interestRate, admTaxesRate, insurenceResult);
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
                admTaxesRate: admTaxesRate,
                insurence: insurenceResult,
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

export = sac;