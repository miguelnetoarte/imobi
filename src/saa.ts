import tables from './tables';
import sumInstallmentDue from './sumInstallmentDue';

import {
    calcInstallmentsTotal,
    calcAmortizationTotal,
    calcInterestRateTotal
} from './util';

const calcInterestRate = function (debitBalance: number, annualInterestRate: number) {
    return debitBalance * ((annualInterestRate / 12) / 100);
}

const saa = function (options: any) {
    const {
        financedAmount,
        deadline,
        annualInterestRate,
        firstInstallmentDue,
    } = options;

    let summary: any = {};
    let installments = {};
    let amortization = 0;
    let installmentsTotal = 0;
    let amortizationTotal = 0;
    let interestRateTotal = 0;

    let financedValue = financedAmount;

    for (let index = 1; index <= deadline; index++) {
        
        if (index === deadline) amortization = financedValue;
        let interestRate = calcInterestRate(financedValue, annualInterestRate);
        let installmentValue = (index === deadline) ? amortization + interestRate : interestRate;
        let debitBalance =  (index === deadline) ? financedValue - amortization : financedValue;
        installmentsTotal = calcInstallmentsTotal(installmentsTotal, installmentValue);
        amortizationTotal = calcAmortizationTotal(amortizationTotal, amortization);
        interestRateTotal = calcInterestRateTotal(interestRateTotal, interestRate);
        
        installments = {
            ...installments,
            [index]: {
                installment: index,
                amortization: amortization,
                interestRate: interestRate,
                installmentValue: installmentValue,
                installmentDue: sumInstallmentDue(firstInstallmentDue, index),
                debitBalance: debitBalance

            }
        }

        summary = {
            installments,
            deadline,
            installmentsTotal,
            amortizationTotal,
            requestedValue: financedAmount,
            interestRateTotal,
            table: tables.SAA,
            annualInterestRate
        }
    }

    return summary;
}

export = saa;